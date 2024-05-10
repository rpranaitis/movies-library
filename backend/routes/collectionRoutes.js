const express = require('express');
const { addingSchema } = require('../validation/collectionValidationSchemas');
const { handleError } = require('../validation/errorHandler');
const { authToken } = require('../middlewares/authMiddlewares');
const { ObjectId } = require('mongodb');

require('dotenv').config();

const router = express.Router();
const client = require('../config/db');

router.post('/', authToken, async (req, res) => {
  try {
    await addingSchema.validate(req.body, { abortEarly: true });
    const { imdb_id, title, year, genres, rating, runtime, image } = req.body;

    const existingMovie = await client
      .db(process.env.MONGO_DATABASE)
      .collection('movies')
      .findOne({
        user_id: new ObjectId(`${req.user._id}`),
        imdb_id: imdb_id,
      });

    if (existingMovie) {
      return res.status(400).send({ message: `Movie „${title}“ already exists in your collection.` });
    }

    const data = { user_id: new ObjectId(`${req.user._id}`), imdb_id, title, year, genres, rating, runtime, image };
    await client.db(process.env.MONGO_DATABASE).collection('movies').insertOne(data);

    return res.status(201).send({ message: `Movie „${title}“ was successfully added to your collection.` });
  } catch (error) {
    return handleError(res, error);
  }
});

module.exports = router;
