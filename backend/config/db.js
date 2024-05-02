const { MongoClient } = require('mongodb');

require('dotenv').config();

let connection;

(async function connectToMongoDB() {
  if (connection) {
    return connection;
  }

  const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.o98qsjc.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
  const client = new MongoClient(URI);

  try {
    await client.connect();
    connection = client.db(process.env.DB_DATABASE);
    console.log('Connected to MongoDB');

    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
})();

module.exports = client;
