const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../validation/authValidationSchemas');
const { handleError } = require('../validation/errorHandler');
const { authToken } = require('../middlewares/authMiddlewares');

require('dotenv').config();

const router = express.Router();
const client = require('../config/db');

router.post('/register', async (req, res) => {
  try {
    await registerSchema.validate(req.body, { abortEarly: true });
    const { email, password } = req.body;
    const user = await client.db(process.env.MONGO_DATABASE).collection('users').findOne({ email });

    if (user) {
      return res.status(400).send({ message: 'User already exists.' });
    }

    bcrypt.hash(password, 10, async (error, hash) => {
      if (error) {
        return handleError(res, error);
      }

      await client.db(process.env.MONGO_DATABASE).collection('users').insertOne({ email, password: hash });

      return res.status(201).send({ message: 'Registration successfull. Now you can sign in.' });
    });
  } catch (error) {
    return handleError(res, error);
  }
});

router.post('/login', async (req, res) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: true });
    const { email, password } = req.body;

    const user = await client.db(process.env.MONGO_DATABASE).collection('users').findOne({ email });

    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }

    bcrypt.compare(password, user.password, (error, result) => {
      if (error || !result) {
        return res.status(401).send({ message: 'Invalid email or password.' });
      }

      const token = jwt.sign({ email: user.email }, process.env.AUTH_SECRET_KEY, { expiresIn: '365d' });

      return res.send({ message: 'You have successfully logged in.', token });
    });
  } catch (error) {
    return handleError(res, error);
  }
});

router.get('/profile', authToken, (req, res) => {
  res.send(req.user);
});

module.exports = router;
