import UserProgress from '../models/userProgressModel.js';

const storeHistory = async (req, res, next) => {
  try {
    const {prompt, responseStrategy, practiceProblems, probability } = req.body;
    if (!prompt || !responseStrategy || !practiceProblems || !probability) {
      return res.status(400).json({ error: 'History object is not in correct format' });
    }

    const historyObject = new UserProgress({prompt, responseStrategy, practiceProblems, probability, });
    await historyObject.save();
    return res.status(200).json({ message: 'History stored successfully' });
  } catch (error) {
    console.error('Error in parseUserQuery:', error);
    next(error);
  }
};

export {storeHistory};