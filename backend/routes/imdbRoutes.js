const express = require('express');
const axios = require('axios');

require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {
  const options = {
    method: 'GET',
    url: `https://${process.env.IMDB_HOST}/v1/find/`,
    params: { query: req.query.q },
    headers: {
      'X-RapidAPI-Key': process.env.IMDB_KEY,
      'X-RapidAPI-Host': process.env.IMDB_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    const filteredData = response.data.titleResults.results.filter((item) => item.titleReleaseText && item.imageType === 'movie');

    const result = filteredData.map((item) => {
      return {
        imdb_id: item.id,
        title: item.titleNameText,
        year: item.titleReleaseText,
        credits: item.topCredits,
        image: item.titlePosterImageModel ? item.titlePosterImageModel.url : null,
      };
    });

    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
