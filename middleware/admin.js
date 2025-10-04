// middleware/isAdmin.js
const isAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  next();
};
module.exports = { isAdmin };
