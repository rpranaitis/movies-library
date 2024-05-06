const cors = require('cors');
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const imdbRoutes = require('./routes/imdbRoutes');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/imdb', imdbRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
