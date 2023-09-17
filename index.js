require('dotenv').config();

const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const cors = require('cors'); //cross-orign resource sharing

const app = express();
app.use(cors()); // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
const url =
  'mongodb+srv://mongouser1:' +
  process.env.MONGODB_PWD +
  '@cluster0.zem8ftm.mongodb.net/myFirstDb?retryWrites=true&w=majority';
const mongoose = require('mongoose');
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

app.use(express.json()); // Allows express to read a request body
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const normalRouter = require('./routes/normal');
const portfolioRouter = require('./routes/portfolio');

app.use('/admin', adminRouter);
app.use('/normal', normalRouter);
app.use('/auth', authRouter);
app.use('/portfolio', portfolioRouter);

const exceptionHandler = require('./middlewares/exceptionHandler');
app.use(exceptionHandler);

const port = 3001; // Must be different than the port of the React app
app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
