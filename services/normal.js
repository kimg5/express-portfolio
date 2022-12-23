const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { getUserFromToken } = require("../middlewares/auth");
const userModel = require("../models/user");

const respContent = (success, message, content) => {
  return { success: success, message: message, content: content };
};

exports.getProfile = async (req) => {
  const user = await getUserFromToken(req);
  user.password = "";
  return respContent(true, "", user);
};

exports.updatePassword = async (req) => {
  const password = req.body.password;
  const username = req.body.confirmPassword;
  const user = await getUserFromToken(req);

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const results = await userModel.updateOne(
    {
      _id: user._id,
    },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );
  if (results.matchedCount == 1 && results.modifiedCount == 1) {
    return respContent(true, "Password Updated successfully", "Password Updated successfully");
  }
  throw new Error("Update the password incorrectly");
};

exports.updateProfile = async (req) => {
  const email = req.body.email;
  const card = req.body.card;
  
  fieldsToUpdate = {};
  if (card) {
    fieldsToUpdate.card = card;
  }
  if (email) {
    fieldsToUpdate.email = email;
  }

  if (fieldsToUpdate === {}) {
    throw new Error("No fields to update for the profile");
  }

  const user = await getUserFromToken(req);
  const results = await userModel.updateOne(
    {
      _id: user._id,
    },
    {
      $set: fieldsToUpdate,
    }
  );

  if (results.matchedCount == 1 && results.modifiedCount == 1) {
    return respContent(true, "Profile Updated successfully", "Profile Updated successfully");
  }
  throw new Error("Update the profile incorrectly");
};

