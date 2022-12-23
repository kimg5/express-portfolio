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

//----------------------------testing----------------------------//
const testData = {
  username: 'xiao',
  info: {
    email: 'pxtoday@hotmail.com',
    linkedin: 'https://www.linkedin.com/in/xiao-pei-508aab258/',
    github: 'https://github.com/xiaoxiao-pei',
  },
  header: {
    Name: 'John Smith',
    Title: 'Full stack developer',
    image: 'photo-1671565300814-avatar1.jpg',
  },
  aboutPhoto: 'photo-1671565300815-avatar3.jpg',
  experience: [
    {
      id: '1',
      title: 'Frontend Development',
      key: 'frontend',
      css: 'experience__frontend',
      skills: [
        {
          skill: 'HTML',
          level: '5',
        },
        {
          skill: 'CSS',
          level: '5',
        },
      ],
    },
    {
      id: '2',
      title: 'Backend Development',
      css: 'experience__backend',
      key: 'backend',
      skills: [
        {
          skill: 'JAVA',
          level: '5',
        },
        {
          skill: 'PYTHON',
          level: '5',
        },
      ],
    },
  ],
  education: [
    {
      id: '1',
      subject: 'computer science',
      school: 'Concordia University',
      country: 'Canada',
      startTime: '2000.09',
      endTime: '2004.06',
      degree: 'Doctor',
    },
    {
      id: '2',
      subject: 'computer science',
      school: 'Concordia University',
      country: 'Canada',
      startTime: '1996.09',
      endTime: '2000.06',
      degree: 'Bachelor',
    },
  ],
  projects: [
    {
      id: '1',
      image: 'photo-1671565300815-avatar3.jpg',
      title: 'sushi restaurant',
      github: 'url...',
      demo: 'url...',
    },
    {
      id: '2',
      image: 'photo-1671565300815-avatar3.jpg',
      title: 'react project',
      github: 'url...',
      demo: 'url...',
    },
  ],
  cv: 'photo-1671565300815-C.V.de Zhang Xiao.pdf',
};

const portfolioModel = require('./models/portfolio');
portfolioModel.create(testData);

//----------------------------end testing----------------------------//

const port = 3001; // Must be different than the port of the React app
app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
