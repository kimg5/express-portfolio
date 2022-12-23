const express = require("express");
const router = express.Router();

const normalService = require("../services/normal");
const { isLogin } = require("../middlewares/auth");

router.get("/users", isLogin, async (req, res) => {
  const content = await normalService.getProfile(req);
  res.send(content);
});

router.patch("/users/password", isLogin, async (req, res) => {
  const content = await normalService.updatePassword(req);
  res.send(content);
});

router.post("/users/password", isLogin, async (req, res) => {
  const content = await normalService.updatePassword(req);
  res.send(content);
});


router.patch("/users/profile", isLogin, async (req, res) => {
  const content = await normalService.updateProfile(req);
  res.send(content);
});

router.post("/users/profile", isLogin, async (req, res) => {
  const content = await normalService.updateProfile(req);
  res.send(content);
});


module.exports = router;
