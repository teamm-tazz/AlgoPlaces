const storeHistory = async (req, res, next) => {
  try {

    const {response, responseStrategy, practiceProblems } = req.body;
    console.log('req.body', response, responseStrategy, practiceProblems);
    if (!response || !responseStrategy || !practiceProblems) {
      return res.status(400).json({ error: 'History object not in correct format' });
    }

    const historyObject = new userProgressSchema({response, responseStrategy, practiceProblems});
    console.log('historyObject before saving to db', historyObject);
    await historyObject.save();
    next();
  } catch (error) {
    console.error('Error in parseUserQuery:', error);
    next(error);
  }
};

export { storeHistory };