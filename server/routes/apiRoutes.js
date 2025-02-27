const express = require('express');
const { generateResponse } = require('../controllers/openaiController');
const parseUserQuery = require('../controllers/parseUserQuery');

const router = express.Router();

router.post('/generate', parseUserQuery, generateResponse, (req, res) => {
  res.status(200).json(res.locals.generatedResponse);
});

module.exports = router;
