const express = require("express");

const {
  loginController,
  registerUser,
  checkEmailAndSendLink,
} = require("../controllers/userControllers");
const router = express.Router();
router.route("/login").post(loginController);
router.route("/register").get(registerUser);
router.post("/reset-password", checkEmailAndSendLink);

module.exports = router;
