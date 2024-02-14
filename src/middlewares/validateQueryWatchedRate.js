const validateQueryWatchedRate = (req, res, next) => {
  const watchedQuery = req.query.date;
  const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (watchedQuery && !regexData.test(watchedQuery)) {
    return res.status(400).json({
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

module.exports = validateQueryWatchedRate;