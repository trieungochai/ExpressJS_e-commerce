const { StatusCodes } = require("http-status-codes");
const User = require("../models/User.model");
const { UnauthenticatedError, BadRequestError } = require("../errors");
const { attachCookiesToResponse } = require("../utils");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("This email already exists");
  }

  // 1st registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const newUser = await User.create({
    name,
    email,
    password,
    role,
  });

  const tokenPayload = {
    userId: newUser._id,
    userName: newUser.name,
    userRole: newUser.role,
  };

  attachCookiesToResponse({ res, tokenPayload });
  
  return res.status(StatusCodes.CREATED).json({ tokenPayload });
};

const loginUser = async (req, res) => {};

const logoutUser = async (req, res) => {};

module.exports = { registerUser, loginUser, logoutUser };
