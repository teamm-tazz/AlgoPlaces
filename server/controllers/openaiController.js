require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateResponse = async (req, res, next) => {
  try {
    const { userQuery } = res.locals;

    // Query OpenAI to generate a response
    const aiResponse = await openai.createCompletion({
      model: 'gpt-4',
      prompt: `Generate a strategy to solve the following problem: ${userQuery}`,
      max_tokens: 150,
    });
    const strategy = aiResponse.data.choices[0].text.trim();

    // Generate practice problems in a single query
    const problemsResponse = await openai.createCompletion({
      model: 'gpt-4',
      prompt: `Generate 10 practice problems related to: ${userQuery}`,
      max_tokens: 500,
    });
    const problemsText = problemsResponse.data.choices[0].text.trim();

    // Split the response into individual problems
    const practiceProblems = problemsText
      .split('\n')
      .map((problem) => ({
        problem: problem.trim(),
        isCompleted: false,
      }))
      .filter((problem) => problem.problem.length > 0);

    // Construct the response
    const response = {
      prompt: userQuery,
      responseStrategy: strategy,
      practiceProblems: practiceProblems,
    };

    res.locals.generatedResponse = response;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { generateResponse };
