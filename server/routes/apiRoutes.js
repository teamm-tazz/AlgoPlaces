const express = require('express');
const {
  generateStrategy,
  generatePracticeProblems,
} = require('../controllers/openaiController');
const parseUserQuery = require('../controllers/parseUserQuery');

const router = express.Router();

// Generate initial strategy
router.post('/generate', parseUserQuery, async (req, res) => {
  try {
    await generateStrategy(req, res, () => {});
    res.json(res.locals.generatedResponse);
  } catch (error) {
    console.error('Error in generate strategy:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generate practice problems in a separate endpoint
router.post('/practice-problems', parseUserQuery, async (req, res) => {
  try {
    await generatePracticeProblems(req, res, () => {});
    res.json(res.locals.practiceProblems);
  } catch (error) {
    console.error('Error in generate practice problems:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
