const parseUserQuery = async (req, res, next) => {
  try {
    const { userQuery } = req.body;

    if (!userQuery) {
      return res.status(400).json({ error: 'User query is required' });
    }

    res.locals.userQuery = userQuery;
    next();
  } catch (error) {
    console.error('Error in parseUserQuery:', error);
    next(error);
  }
};

const storeHistory = async (req, res, next) => {
  try {
    console.log('I am in storeHistory');
    const {response, responseStrategy, practiceProblems, probability } = req.body;
    console.log('req.body', response, responseStrategy, practiceProblems);
    if (!response || !responseStrategy || !practiceProblems) {
      return res.status(400).json({ error: 'History object not in correct format' });
    }

    const historyObject = new userProgressSchema({response, responseStrategy, probability, practiceProblems});
    console.log('historyObject before saving to db', historyObject);
    await historyObject.save();
    return res.status(201).json({ message: 'History stored successfully' });
  } catch (error) {
    console.error('Error in parseUserQuery:', error);
    next(error);
  }
};

// export { storeHistory };

export { parseUserQuery, storeHistory };
