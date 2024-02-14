function validateQueryRate(req, res, next) {
  const searchRate = req.query.rate;
  if (searchRate !== undefined) {
    const rateValue = parseFloat(searchRate);

    if (!Number.isInteger(rateValue) || rateValue < 1 || rateValue > 5) {
      return res.status(400).json(
        { message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' },
      );
    }
  }

  next();
}

module.exports = validateQueryRate;