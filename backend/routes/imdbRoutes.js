const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const { authToken } = require('../middlewares/authMiddlewares');
const { randomUserAgent } = require('../utils/scrapping');

require('dotenv').config();

const router = express.Router();

router.get('/', authToken, async (req, res) => {
  const options = {
    method: 'GET',
    url: `https://${process.env.IMDB_SEARCH_HOST}/suggestion/x/${req.query.q}.json`,
  };

  try {
    const response = await axios.request(options);
    const currentYear = new Date().getFullYear();
    const filteredData = response.data.d.filter((item) => item.y && item.y <= currentYear && item.i && item.qid === 'movie');

    const result = filteredData.map((item) => {
      return {
        imdb_id: item.id,
        title: item.l,
        year: item.y,
        credits: item.s,
        image: item.i.imageUrl,
      };
    });

    return res.send(result);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.get('/:id', authToken, async (req, res) => {
  const options = {
    method: 'GET',
    url: `https://${process.env.IMDB_MAIN_HOST}/title/${req.params.id}`,
    headers: {
      'User-Agent': randomUserAgent,
    },
  };

  try {
    const axiosResponse = await axios.request(options);
    const html = axiosResponse.data;
    const $ = cheerio.load(html);
    const obj = JSON.parse($('#__NEXT_DATA__').text());
    const response = obj.props.pageProps.aboveTheFoldData;

    const result = {
      imdb_id: response.id,
      title: response.originalTitleText.text,
      description: response.plot.plotText.plainText,
      year: response.releaseYear.year,
      genres: response.genres.genres.map((item) => item.text),
      ratingSummary: {
        rating: response.ratingsSummary.aggregateRating,
        voteCount: response.ratingsSummary.voteCount,
      },
      runtime: response.runtime ? response.runtime.displayableProperty.value.plainText : null,
      image: response.primaryImage.url,
      trailer: response.primaryVideos.edges.length ? response.primaryVideos.edges[0].node.playbackURLs[0].url : null,
      credits: response.principalCredits
        .filter((item) => item.category.id === 'cast')[0]
        .credits.map((item) => item.name.nameText.text)
        .join(', '),
    };

    return res.send(result);
  } catch (error) {
    if (error?.response?.status === 404) {
      return res.status(404).send({ message: 'Movie not found.' });
    }

    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
