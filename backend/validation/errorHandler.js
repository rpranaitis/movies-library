const handleError = (res, error) => {
  if (error.name === 'ValidationError') {
    return res.status(400).send({ message: error.message });
  }

  return res.status(500).send({ error: error.message });
};

module.exports = {
  handleError,
};
