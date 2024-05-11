const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const { registerSchema, loginSchema } = require('../validation/authValidationSchemas');
const { handleError } = require('../validation/errorHandler');
const { authToken } = require('../middlewares/authMiddlewares');
const { fetchUserWithInfo, userDataResponse } = require('../utils/db');

require('dotenv').config();

const router = express.Router();
const client = require('../config/db');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Too many login attempts. Please try again later.' },
});

const registerLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 1,
  message: { message: 'Too many registration attempts from this IP. Please try again later.' },
});

const profileLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests. Please try again later.' },
});

// router.use('/login', loginLimiter);
// router.use('/register', registerLimiter);
// router.use('/profile', profileLimiter);

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

      const createdAt = new Date().toLocaleString();

      await client
        .db(process.env.MONGO_DATABASE)
        .collection('users')
        .insertOne({ email, password: hash, created_at: createdAt, updated_at: createdAt });

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

    const user = await fetchUserWithInfo(email);

    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }

    bcrypt.compare(password, user.password, (error, result) => {
      if (error || !result) {
        return res.status(401).send({ message: 'Invalid email or password.' });
      }

      const userData = userDataResponse(user);

      const token = jwt.sign(userData, process.env.AUTH_SECRET_KEY, { expiresIn: '365d' });

      return res.send({ message: 'You have successfully logged in.', user: userData, token });
    });
  } catch (error) {
    return handleError(res, error);
  }
});

router.get('/profile', authToken, (req, res) => {
  res.send(req.user);
});

module.exports = router;
