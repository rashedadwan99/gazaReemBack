const express = require("express");

const {
  loginController,
  registerUser,
  checkEmailAndSendLink,
  changePassword,
} = require("../controllers/userControllers");
const router = express.Router();
router.route("/login").post(loginController);
router.route("/register").get(registerUser);
router.post("/check_email", checkEmailAndSendLink);
router.put("/change-password", changePassword);

module.exports = router;
