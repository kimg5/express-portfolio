const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const portfolioModel = require('../models/portfolio');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // define folder to store upload pictures
    cb(null, 'statics');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  },
});

let upload = multer({
  storage,
});

const portfolioService = require('../services/portfolio');
const { response } = require('express');
const { blob } = require('stream/consumers');

router.post('/portfolios/:username', upload.any('static'), async (req, res) => {
  let username = req.params.username;
  let user = await portfolioModel.findOne({ username: username });
  if (!user) {
    const content = await portfolioService.createPortfolio(req);
    res.send(content);
  } else {
    throw new Error('Sorry, you have already a portfolio.');
  }
});

router.get('/portfolios/:username', async (req, res) => {
  console.log('fetching portfolio');
  const content = await portfolioService.getPortfolioDetail(
    req.params.username
  );
  res.send(content);
});

router.get('/portfolios', async (res) => {
  const content = await portfolioService.getPortfolio();
  res.send(content);
});

router.get('/portfolios/getphoto/:photoname', async (req, res) => {
  console.log('fetching photo');
  let photoname = req.params.photoname;
  console.log(photoname);
  let path = `statics/${photoname}`;
  await fs.readFile(path, (err, data) => {
    if (!err) {
      res.send(data);
    } else throw new Error('Sorry, photo not found.');
  });
});
router.get('/portfolios/getcv/:cvname', async (req, res) => {
  console.log('cv:');
  let cvname = req.params.cvname;
  let path = `statics/${cvname}`;
  fs.readFile(path, (err, data) => {
    if (err) throw new Error('Sorry, no CV.');
    res.setHeader('Content-Type', `application/pdf`);
    res.setHeader('Content-Disposition', `attachment; filename=${cvname}`);
    res.send(data);
  });
});

router.post('/contactme', async (req, res) => {
  const content = await portfolioService.sendEmail(req);
  res.send(content);
});

module.exports = router;
