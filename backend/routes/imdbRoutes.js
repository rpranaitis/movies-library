const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const { randomUserAgent } = require('../utils/scrapper');

require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {
  const options = {
    method: 'GET',
    url: `https://${process.env.IMDB_SEARCH_HOST}/suggestion/x/${req.query.q}.json`,
  };

  try {
    const response = await axios.request(options);
    const filteredData = response.data.d.filter((item) => item.y && item.qid === 'movie');

    const result = filteredData.map((item) => {
      return {
        imdb_id: item.id,
        title: item.l,
        year: item.y,
        credits: item.s,
        image: item.i ? item.i.imageUrl : null,
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
      ratingsSummary: {
        rating: response.ratingsSummary.aggregateRating,
        voteCount: response.ratingsSummary.voteCount,
      },
      runtime: response.runtime.displayableProperty.value.plainText,
      image: response.primaryImage.url,
      trailer: response.primaryVideos.edges.length ? response.primaryVideos.edges[0].node.playbackURLs[0].url : null,
      credits: response.principalCredits
        .filter((item) => item.category.id === 'cast')[0]
        .credits.map((item) => item.name.nameText.text)
        .join(', '),
    };

    return res.send(result);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
