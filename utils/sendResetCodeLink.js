const emailjs = require("emailjs-com");

const sendResetLink = async (email) => {
  try {
    const templateParams = {
      to_email: email,
      reset_link: process.env.RESET_PASS_LINK,
    };

    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.EMAILJS_PUBLIC_KEY
    );
  } catch (error) {
    console.error("❌ Failed to send reset link:", error);
    throw error;
  }
};

module.exports = sendResetLink;
