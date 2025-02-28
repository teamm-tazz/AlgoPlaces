const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', apiRoutes);

/// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('There was an error processing the request!');
});

mongoose
  .connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
