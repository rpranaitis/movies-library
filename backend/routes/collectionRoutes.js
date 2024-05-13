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
    const { imdbId, title, primaryTitle, year, genres, rating, runtime, image } = req.body;

    const existingMovie = await client
      .db(process.env.MONGO_DATABASE)
      .collection('movies')
      .findOne({
        userId: new ObjectId(`${req.user._id}`),
        imdbId: imdbId,
      });

    if (existingMovie) {
      return res.status(400).send({ message: `Movie „${title}“ already exists in your collection.` });
    }

    const createdAt = new Date().toLocaleString();

    const data = {
      userId: new ObjectId(`${req.user._id}`),
      imdbId,
      title,
      primaryTitle,
      year,
      genres,
      rating,
      runtime,
      image,
      createdAt,
      updatedAt: createdAt,
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
    const foundMovie = await client.db(process.env.MONGO_DATABASE).collection('movies').findOne({ imdbId: id, userId: req.user._id });
    const response = await client.db(process.env.MONGO_DATABASE).collection('movies').deleteOne({ imdbId: id, userId: req.user._id });

    if (response.deletedCount === 0) {
      return res.status(400).send({ message: `Movie was not found in your collection.` });
    }

    return res.send({ message: `Movie „${foundMovie.title}“ was removed from your collection.` });
  } catch (error) {
    return handleError(res, error);
  }
});

module.exports = router;
