const { getOpenAIResponse } = require('../../utils/openaiClient');

exports.getResponse = async (req, res) => {
  try {
    const response = await getOpenAIResponse(req.body.prompt);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};