require("dotenv").config();

const PORT = process.env.PORT;
const ENV_MODE = process.env.NODE_ENV;
const MONGODB_URI = ENV_MODE === "production" ? process.env.MONGODB_URI : ENV_MODE === "test" ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI_DEV

module.exports = {
  MONGODB_URI,
  PORT,
};
