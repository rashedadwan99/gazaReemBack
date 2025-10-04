const mongoose = require("mongoose");
module.exports = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connecting to mongoDB"))
    .catch((ex) => console.log("Failed to connet", ex));
};
