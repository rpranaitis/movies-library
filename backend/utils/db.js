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
      {
        $unwind: {
          path: '$movies',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: { 'movies.created_at': -1 },
      },
      {
        $group: {
          _id: '$_id',
          email: { $first: '$email' },
          password: { $first: '$password' },
          created_at: { $first: '$created_at' },
          updated_at: { $first: '$updated_at' },
          movies: { $push: '$movies' },
        },
      },
    ])
    .toArray();

  return response.length ? response[0] : null;
};

const userDataResponse = (user) => {
  return {
    _id: user._id,
    email: user.email,
    movies: user.movies,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
};

module.exports = { fetchUserWithInfo, userDataResponse };
