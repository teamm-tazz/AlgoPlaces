const parseUserQuery = (req, res, next) => {
  const { userQuery } = req.body;

  if (typeof userQuery !== 'string') {
    return res.status(400).json({ error: 'userQuery must be a string' });
  }

  res.locals.userQuery = userQuery;
  next();
};

module.exports = parseUserQuery;
