const express = require("express");
const router = express.Router();

const userModel = require("../models/user");
const adminService = require("../services/admin");

const {isAdmin} = require("../middlewares/auth");

router.get("/users", isAdmin, async (req, res) => {
  const content = await adminService.getUsers();
  res.send(content);
});

router.delete("/user/:userId", isAdmin, async (req, res) => {
  const content = await adminService.deleteUser(req);
  res.send(content);
});

router.patch("/user/:userId/:status", isAdmin, async (req, res) => {
  console.log("Updating user patch");
  const content = await adminService.updateUser(req);
  res.send(content);
});

router.get("/user/:userId/:status", isAdmin, async (req, res) => {
  console.log("Updating user get");
  const content = await adminService.updateUser(req);
  res.send(content);
});



module.exports = router;
