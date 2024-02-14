const validatePatchRate = (req, res, next) => {
  const { rate } = req.body;

  if (rate === undefined || rate === null) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  next();
};

module.exports = validatePatchRate;
