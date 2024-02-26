require("dotenv").config();

const jwt = require("jsonwebtoken");

const sign = process.env.SECRET;

module.exports = {
  generate(data) {
    return jwt.sign(data, sign, { expiresIn: "30d" });
  },
  verify(token) {
    return jwt.verify(token, sign);
  },
};
