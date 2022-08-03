require("dotenv").config();
const jwt = require("jsonwebtoken");

const createJWT = async ({ payload }) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isValidToken = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, tokenPayload }) => {
  const token = createJWT({ payload: tokenPayload });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    // Signed and Secure Flags
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  // return res.status(201).json({ tokenPayload });
};

module.exports = { createJWT, isValidToken, attachCookiesToResponse };
