const express = require('express');

const router = express.Router();

const path = require('path');
const readJsonData = require('../fs/readJsonData');

const PATH = path.resolve('src', 'talker.json');

router.get('/talker', async (req, res) => {
  const talkers = await readJsonData(PATH);
  if (!talkers) {
    return res.status(200).json([]);
  }
  res.status(200).json(talkers);
});

module.exports = router;