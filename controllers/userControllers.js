const User = require("../models/UserModel");
const generateToken = require("../utils/token");
const { hashPassword, isValidPassword } = require("../utils/hashing");

const registerUser = async (req, res) => {
  const { email, password, name } = req.query;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).send({
        message: "the user is already exists",
      });
    } else {
      const hashedPassword = await hashPassword(password);
      user = new User({
        email,
        name,
        password: hashedPassword,
        api_token: generateToken(),
      });
      await user.save();
      res.status(200).send({
        name,
        isAdmin: user.isAdmin,

        api_token: user.api_token,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const changePassword = async (req, res) => {
  try {
    const { api_token, password } = req.body;
    const user = await User.findOne({ api_token });
    if (!user) {
      res.status(400).send("المستخدم غير موجود");
    }
    const hashedPassword = await hashPassword(password);

    user.password = hashedPassword;
    user.api_token = generateToken();
    await user.save();
    res.status(200).send("تم تغيير كلمة المرور بنجاح");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const loginController = async (req, res) => {
  const { email, password } = req.query;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "Invalid email or password",
      });
    }
    if (user) {
      const isValidPass = await isValidPassword(password, user);
      if (!isValidPass) {
        return res.status(400).send({
          message: "Invalid email or password",
        });
      }
      return res.status(200).send({
        api_token: user.api_token,
        name: user.name,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkEmailAndSendLink = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.save();

    return res
      .status(200)
      .json({ message: "Reset code sent to email", api_token: user.api_token });
  } catch (error) {
    console.error("Reset password error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  loginController,
  registerUser,
  checkEmailAndSendLink,
  changePassword,
};
