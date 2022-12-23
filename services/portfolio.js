const portfolioModel = require('../models/portfolio');

const respContent = (success, message, content) => {
  return { success: success, message: message, content: content };
};

exports.getPortfolioDetail = async (username) => {
  console.log('username:' + username);
  const portfolio = await portfolioModel.findOne({ username: username });
  if (portfolio) return respContent(true, 'portfolio found', portfolio);
  throw Error('Sorry, no portfolio found.');
};

exports.getPortfolio = async () => {
  console.log('portfolio');
  const portfolios = await portfolioModel.find();
  if (portfolios) return respContent(true, ' found', portfolios);
  throw new Error('No found');
};

exports.createPortfolio = async (req) => {
  let cv = findFilename('header-cv', req.files);
  let aboutPhoto = findFilename('aboutPhoto', req.files);

  let header = { ...req.body.header };
  header['image'] = findFilename('header-logo', req.files);

  let proFiles = findProjectFiles(req.files);
  let proJson = JSON.parse(req.body.projects);

  let portfolio = {
   
    username: req.body.username,
    header: header,
    experience: JSON.parse(req.body.experience),
    projects: replaceProFiles(proJson, proFiles),
    education: JSON.parse(req.body.education),
    cv: cv,
    aboutPhoto: aboutPhoto,
  };
  if(req.body.info) { portfolio.info = JSON.parse(req.body.info)}
  console.log(portfolio.experience);

  const newPortfolio = await portfolioModel.create(portfolio);
  return respContent(true, 'Portfolio created', newPortfolio);
};

const findProjectFiles = (reqFiles) => {
  let files = [];
  for (let file of reqFiles) {
    if (file.fieldname.indexOf('pro') === 0) {
      files.push(file);
    }
  }
  return files;
};

const replaceProFiles = (proJson, proFiles) => {
  for (let file of proFiles) {
    for (let pro of proJson) {
      let proname = 'pro' + pro.vid;
      if (proname === file.fieldname) {
        pro.image = file.filename;
      }
    }
  }
  for (let pro of proJson) {
    delete pro.vid;
  }
  return proJson;
};

const findFilename = (prefix, files) => {
  for (let file of files) {
    if (file.fieldname === prefix) return file.filename;
  }
  return '';
};

var nodemailer = require('nodemailer');
exports.sendEmail = async (req) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const receiverEmail = req.body.receiverEmail;

  const emailContent =
    'From: ' +
    name +
    '\n' +
    'Email: ' +
    email +
    '\n' +
    'Message: ' +
    '\n' +
    message;

  console.log(emailContent);

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'reacter2022@gmail.com',
      pass: 'FSDreacter2022',
      clientId:
        '580473509575-vi0vuemiqbmhfiv1clgv1hsaerjra3ak.apps.googleusercontent.com',
      clientSecret: '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',
      refreshToken:
        '1//04y4Ypi64vKaZCgYIARAAGAQSNwF-L9Irq3kgbSzuYqX4Yi6_v3LGkjGfn8ynyzN8bwKqA7oB5Ki1q5m0dFUF5uwiSSeE6G_mhMM',
    },
  });

  var mailOptions = {
    from: 'reacter2022@gmail.com',
    to: receiverEmail,
    subject: 'Contect me message',
    text: emailContent,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent successfully ');
      return respContent(true, 'Email sent success', portfolio._id);
    }
  });
};
