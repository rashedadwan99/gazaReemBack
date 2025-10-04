const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

const isValidPassword = async (password, user) => {
  return await bcrypt.compare(password, user.password);
};

module.exports = { hashPassword, isValidPassword };
