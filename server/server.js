const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});