const client = require('../config/db');

const fetchUserWithInfo = async (email) => {
  const response = await client
    .db(process.env.MONGO_DATABASE)
    .collection('users')
    .aggregate([
      {
        $match: { email: email },
      },
      {
        $lookup: {
          from: 'movies',
          localField: '_id',
          foreignField: 'user_id',
          as: 'movies',
        },
      },
    ])
    .toArray();

  return response.length ? response[0] : null;
};

module.exports = { fetchUserWithInfo };
