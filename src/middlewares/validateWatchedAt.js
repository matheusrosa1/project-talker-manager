const validateWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  /*   const watchedQuery = req.query.date; */
  const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regexData.test(watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  /*   if (watchedQuery !== undefined && !regexData.test(watchedQuery)) {
    return res.status(400).json({
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
    });
  } */
  next();
};

module.exports = validateWatchedAt;