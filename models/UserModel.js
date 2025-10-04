const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    image: { type: String },
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    phone2: { type: String },
    password: { type: String, required: true },
    api_token: { type: String },
    isAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    agree: { type: Boolean, required: true, default: true },
    resetCode: { type: String }, // رمز إعادة التعيين
    resetCodeExpires: { type: Date }, // وقت انتهاء صلاحية الرمز
  },
  { timestamps: true }
);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
