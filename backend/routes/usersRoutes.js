const express = require('express');
const { handleError } = require('../validation/errorHandler');
const { authToken } = require('../middlewares/authMiddlewares');

require('dotenv').config();

const router = express.Router();
const client = require('../config/db');

router.get('/', authToken, async (req, res) => {
  try {
    const response = await client.db(process.env.MONGO_DATABASE).collection('users').find().sort({ createdAt: -1 }).toArray();
    const data = response.map((item) => {
      return { _id: item._id, email: item.email, createdAt: item.createdAt, updatedAt: item.updatedAt };
    });

    return res.status(201).send({ data });
  } catch (error) {
    return handleError(res, error);
  }
});

module.exports = router;
