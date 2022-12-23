const mongoose = require("mongoose");

// const infoSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//   },
//   linkedin: {
//     type: String,
//   },
//   github: {
//     type: String,
//   },
// });

const headerSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

//-----------experience schema start --------------------//
const skillSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});

const experienceSchema = new mongoose.Schema({
  id: {
    type: Number,
//     required: true,
  },
  title: {
    type: String,
//     required: true,
  },
  key: {
    type: String,
    required: true,
  },
  css: {
    type: String,
    required: true,
  },
  skills: [skillSchema],
});
//-----------experience schema ends --------------------//

//-----------education schema starts --------------------//
const educationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});
//-----------education schema ends --------------------//

//-----------project schema start --------------------//
const projectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  demo: {
    type: String,
    required: true,
  },
});
//-----------project schema ends --------------------//

const PortfolioSchema = new mongoose.Schema({
  username: {
    type: "string",
    required: true,
  },
  cv: {
    type: "string",
  },
  aboutPhoto: {
    type: "string",
  },

//   info: infoSchema,

  header: headerSchema,

  experience: [experienceSchema],

  education: [educationSchema],

  projects: [projectSchema],
});

// Mongoose will assume there is a collection called the plural of this name (i.e., 'users' in this case).
const Portfolio = mongoose.model("Portfolio", PortfolioSchema);
module.exports = Portfolio;
