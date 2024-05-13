const yup = require('yup');
const { REQUIRED_FIELDS_MESSAGE } = require('../validation/constants');

const addingSchema = yup.object().shape({
  imdbId: yup.string().required(REQUIRED_FIELDS_MESSAGE),
  title: yup.string().required(REQUIRED_FIELDS_MESSAGE),
  primaryTitle: yup.string().required(REQUIRED_FIELDS_MESSAGE),
  year: yup.number().required(REQUIRED_FIELDS_MESSAGE),
  genres: yup.array().of(yup.string().required()).required(REQUIRED_FIELDS_MESSAGE),
  rating: yup.number().required(REQUIRED_FIELDS_MESSAGE),
  runtime: yup.string().required(REQUIRED_FIELDS_MESSAGE),
  image: yup.string().required(REQUIRED_FIELDS_MESSAGE),
});

module.exports = {
  addingSchema,
};
