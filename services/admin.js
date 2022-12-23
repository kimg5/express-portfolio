const { getUserFromToken } = require("../middlewares/auth");
const userModel = require("../models/user");

const respContent = (success, message, content) => {
  return { success: success, message: message, content: content };
};
const _getUsers = async () => {
  const users = await userModel.find();
  if (users) return respContent(true, "Users found", users);
  throw new Error("No users found");
}  
exports.getUsers = async () => {
  const respContent =  await _getUsers();
  return respContent;
};

exports.deleteUser = async (req) => {
  console.log("deleteUser");
  const status = await userModel.remove({ _id: req.params.userId });
  if (status.deletedCount === 1) {
    const respContent =  await _getUsers();
    return respContent;
  }
  throw new Error("The user " + req.params.userId + " cannot be deleted");
};

exports.updateUser = async (req) => {
  console.log("Updating user");
  const row = await userModel.findByIdAndUpdate(req.params.userId,{$set:{status:req.params.status}}).exec();
  if (row) {
    const respContent =  await _getUsers();
    return respContent;
  }
  throw new Error("The user " + req.params.userId + " cannot be update");
};


