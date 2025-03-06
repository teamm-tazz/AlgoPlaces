import UserProgress from '../models/userProgressModel.js';

const storeHistory = async (req, res, next) => {
  try {
    const { title, prompt, responseStrategy, practiceProblems, probability } =
      req.body;
    if (
      !title ||
      !prompt ||
      !responseStrategy ||
      !practiceProblems ||
      !probability
    ) {
      return res
        .status(400)
        .json({ error: 'History object is not in correct format' });
    }
    const historyObject = new UserProgress({
      title,
      prompt,
      responseStrategy,
      practiceProblems,
      probability,
    });
    const existingData = await UserProgress.findOne({ title });
    console.log('existingData in history', existingData);
    if (existingData) {
      // Update the existing document with new data from req.body
      await UserProgress.findOneAndUpdate(
        { title },
        {
          $set: {
            prompt,
            responseStrategy,
            practiceProblems,
            probability,
          },
        },
        { new: true }
      );
    } else {
      await historyObject.save();
    }

    return res.status(200).json({ message: 'History updated successfully' });
  } catch (error) {
    console.error('Error in parseUserQuery:', error);
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const data = await UserProgress.find({}); //grabs all the documents from the backend
    console.log('data from mongoose', data);
    res.locals.history = data;
    return res.status(200).json(res.locals.history);
  } catch (error) {
    console.error('Error in getHistory:', error);
    next(error);
  }
};

const getTitle = async (req, res, next) => {
  try {
    console.log('I am in getTitle');
    const { title } = req.params;
    console.log('title', title);
    const data = await UserProgress.findOne({ title }); //grabs the document from the backend
    console.log('data from mongoose', data);
    res.locals.titleData = data;
    return res.status(200).json(res.locals.titleData);
  } catch (error) {
    console.error('Error in getTitle:', error);
    next(error);
  }
};

export { storeHistory, getHistory, getTitle };
