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

    const createdAt = new Date().toLocaleString();

    const data = {
      user_id: new ObjectId(`${req.user._id}`),
      imdb_id,
      title,
      year,
      genres,
      rating,
      runtime,
      image,
      created_at: createdAt,
      updated_at: createdAt,
    };

    const response = await client.db(process.env.MONGO_DATABASE).collection('movies').insertOne(data);

    data._id = response.insertedId;

    return res.status(201).send({ message: `Movie „${title}“ was added to your collection.`, data });
  } catch (error) {
    return handleError(res, error);
  }
});

router.delete('/:id', authToken, async (req, res) => {
  const { id } = req.params;

  try {
    const response = await client.db(process.env.MONGO_DATABASE).collection('movies').deleteOne({ imdb_id: id, user_id: req.user._id });

    if (response.deletedCount === 0) {
      return res.status(400).send({ message: `Movie was not found in your collection.` });
    }

    return res.send({ message: 'Movie was removed from your collection.' });
  } catch (error) {
    return handleError(res, error);
  }
});

module.exports = router;
