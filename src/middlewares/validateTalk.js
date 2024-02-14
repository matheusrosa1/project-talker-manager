const checkField = (descriptionValue, res, value) => {
  if (descriptionValue === undefined) {
    return res.status(400).json(
      { message: `O campo "${value}" é obrigatório` },
    );
  }
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (talk === undefined) {
    return res.status(400).json(
      {
        message: 'O campo "talk" é obrigatório',
      },
    );
  }
  const { watchedAt, rate } = req.body.talk;
  
  return checkField(talk, res, 'talk')
  || checkField(watchedAt, res, 'watchedAt')
  || checkField(rate, res, 'rate')
  || next();
};

module.exports = validateTalk;
