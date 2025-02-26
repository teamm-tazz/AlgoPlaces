const express = require('express');
const { getResponse } = require('../controllers/openaiController');

const router = express.Router();

router.post('/openai', getResponse);

module.exports = router;