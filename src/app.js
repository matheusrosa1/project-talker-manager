const express = require('express');
const path = require('path');
const readJsonData = require('./fs/readJsonData');
const generateToken = require('./utils/generateToken');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const writeJsonData = require('./fs/writeJsonData');
const findNextId = require('./utils/findNextId');
const validateAuthenticator = require('./middlewares/validateAuthenticator');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const validateQueryRate = require('./middlewares/validateQueryRate');
const validateRate = require('./middlewares/validateRate');
const matchesSearchTerm = require('./utils/matchesSearchTerm');
const matchesRateValue = require('./utils/matchesRateValue');
const matchesWatchedDate = require('./utils/matchesWatchedDate');
const validateQueryWatchedRate = require('./middlewares/validateQueryWatchedRate');
const validatePatchRate = require('./middlewares/validatePatchRate');
const validatePatchRateNumber = require('./middlewares/validatePatchRateNumber');
const { findAll } = require('./db/talkerDB');

const app = express();
const PATH = path.resolve('src', 'talker.json');

app.use(express.json());

app.get('/talker/db', async (req, res) => {
  try {
    const [talkers] = await findAll();

    if (!talkers) {
      return res.status(200).json([]);
    }
    const formattedTalkers = talkers.map((talker) => ({
      id: talker.id,
      name: talker.name,
      age: talker.age,
      talk: {
        watchedAt: talker.talk_watched_at,
        rate: talker.talk_rate
      }
    }));
    res.status(200).json(formattedTalkers)
  } catch (error) {
    res.status(500).json({ message: error.sqlMessage });
  }
})

app.get('/talker', async (req, res) => {
  const talkers = await readJsonData(PATH);
  if (!talkers) {
    return res.status(200).json([]);
  }
  res.status(200).json(talkers);
});

app.get('/talker/search', 
  validateAuthenticator, 
  validateQueryRate, 
  validateQueryWatchedRate, async (req, res) => {
    const originalTalkers = await readJsonData(PATH);
    const searchTerm = req.query.q;
    const rateValue = Number(req.query.rate);
    const watchedDate = req.query.date;
    const filteredTalkers = originalTalkers
      .filter((talker) => (
        matchesSearchTerm(talker, searchTerm)
      && matchesRateValue(talker, rateValue)
      && matchesWatchedDate(talker, watchedDate)
      ));
    return res.status(200).json(filteredTalkers);
  });

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readJsonData(PATH);
  const foundTalker = talkers.find((talker) => talker.id === +id);
  if (!foundTalker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  res.status(200).json(foundTalker);
});

app.post('/login', 
  validateEmail, 
  validatePassword, 
  (req, res) => {
    const token = generateToken();
    res.status(200).json({
      token: `${token}`,
    });
  });

app.post('/talker',
  validateAuthenticator, 
  validateName,
  validateAge, 
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const content = await readJsonData(PATH);
    const talkerContent = req.body;
    const nextId = findNextId(content);
    const newTalker = { id: nextId, ...talkerContent };
    const newContent = [...content, newTalker];
    await writeJsonData(PATH, newContent);
    return res.status(201).json(newTalker);
  });

app.put('/talker/:id', 
  validateAuthenticator, 
  validateName,
  validateAge, 
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const id = Number(req.params.id);
    const talkers = await readJsonData(PATH);
    const FoundTalker = talkers.find((talker) => talker.id === id);
    if (!FoundTalker) {
      return res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    const index = talkers.indexOf(FoundTalker);
    const updateTalker = { id, ...req.body };
    talkers.splice(index, 1, updateTalker);
    await writeJsonData(PATH, talkers);
    res.status(200).json(updateTalker);
  });

app.patch('/talker/rate/:id', 
  validateAuthenticator, 
  validatePatchRate, validatePatchRateNumber, async (req, res) => {
    const { id } = req.params;
    const newRate = req.body.rate;
    const talkers = await readJsonData(PATH);
    const talkerIndex = talkers.findIndex((talker) => talker.id === +id);
    talkers[talkerIndex].talk.rate = newRate;
    await writeJsonData(PATH, talkers);
    res.status(204).send();
  });

app.delete('/talker/:id', validateAuthenticator, async (req, res) => {
  const { id } = req.params;
  const talkers = await readJsonData(PATH);
  const index = talkers.findIndex((talker) => talker.id === +id);
  talkers.splice(index, 1);
  await writeJsonData(PATH, talkers);
  res.status(204).end();
});

module.exports = app;