const jwt = require('jsonwebtoken');
const { fetchUserWithInfo, userDataResponse } = require('../utils/db');

const authToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.AUTH_SECRET_KEY, async (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const userWithInfo = await fetchUserWithInfo(user.email);

    if (!userWithInfo) {
      return res.sendStatus(404);
    }

    req.user = userDataResponse(userWithInfo);
    next();
  });
};

module.exports = {
  authToken,
};
