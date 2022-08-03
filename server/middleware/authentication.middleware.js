const { isValidToken } = require("../utils");
const { UnauthenticatedError } = require("../errors");

const authenticateUser = async (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { userId, userName, userRole } = isValidToken({ token });
    req.user = { userId, userName, userRole };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = { authenticateUser };
