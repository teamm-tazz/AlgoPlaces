import express from 'express';
import {
  generateStrategy,
  generatePracticeProblems,
} from '../controllers/openaiController.js';
import { parseUserQuery } from '../controllers/parseUserQuery.js';

const router = express.Router();

// Generate initial strategy
router.post('/generate', parseUserQuery, async (req, res) => {
  try {
    console.log('I am here');
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

export default router;
