const axios = require('axios');
const express = require('express');

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
    return res.status(500).send({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const options = {
    method: 'GET',
    url: `https://${process.env.IMDB_HOST}/v1/title/`,
    params: { id: req.params.id },
    headers: {
      'X-RapidAPI-Key': process.env.IMDB_KEY,
      'X-RapidAPI-Host': process.env.IMDB_HOST,
    },
  };

  try {
    const response = await axios.request(options);

    const result = {
      imdb_id: response.data.id,
      title: response.data.titleText.text,
      year: response.data.releaseYear.year,
      description: response.data.plot.plotText.plainText,
      genres: response.data.genres.genres.map((item) => item.text),
      runtime: response.data.runtime.displayableProperty.value.plainText,
      ratingsSummary: {
        rating: response.data.ratingsSummary.aggregateRating,
        voteCount: response.data.ratingsSummary.voteCount,
      },
      image: response.data.primaryImage.url,
      trailer: response.data.primaryVideos.edges.length ? response.data.primaryVideos.edges[0].node.playbackURLs[0].url : null,
      credits: response.data.principalCredits
        .filter((item) => item.category.id === 'cast')[0]
        .credits.map((item) => item.name.nameText.text),
    };

    return res.send(result);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
