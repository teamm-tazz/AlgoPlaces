import UserProgress from '../models/userProgressModel.js';

const storeHistory = async (req, res, next) => {
  try {
    const {title, prompt, responseStrategy, practiceProblems, probability } = req.body;
    if (!title || !prompt || !responseStrategy || !practiceProblems || !probability) {
      return res.status(400).json({ error: 'History object is not in correct format' });
    }

    const historyObject = new UserProgress({title, prompt, responseStrategy, practiceProblems, probability});
    await historyObject.save();
    return res.status(200).json({ message: 'History stored successfully' });
  } catch (error) {
    console.error('Error in parseUserQuery:', error);
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const data = await UserProgress.find({});
    console.log('data from mongose', data);
    res.locals.history = data;
    return res.status(200).json(res.locals.history);
  } catch (error) {
    console.error('Error in getHistory:', error);
    next(error);
  }
};

export {storeHistory, getHistory};