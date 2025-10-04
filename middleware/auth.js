const User = require("../models/UserModel");

const auth = async (req, res, next) => {
  try {
    const apiToken =
      req.body?.api_token || req.query?.api_token || req.headers?.api_token;
    if (!apiToken) {
      return res
        .status(401)
        .send({ message: "Access denied. No token provided." });
    }

    const user = await User.findOne({ api_token: apiToken });
    if (!user) {
      return res.status(401).send({ message: "Invalid token." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { auth };
