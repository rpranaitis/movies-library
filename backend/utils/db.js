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
          foreignField: 'userId',
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
        $sort: { 'movies.createdAt': -1 },
      },
      {
        $group: {
          _id: '$_id',
          email: { $first: '$email' },
          password: { $first: '$password' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
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
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

module.exports = { fetchUserWithInfo, userDataResponse };
