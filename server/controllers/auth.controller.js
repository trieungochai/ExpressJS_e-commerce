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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please enter your email and password");
  }
  const loggedInUser = await User.findOne({ email });
  if (!loggedInUser) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // compare password
  const isPasswordCorrect = await loggedInUser.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const tokenPayload = {
    userId: loggedInUser._id,
    userName: loggedInUser.name,
    userRole: loggedInUser.role,
  };

  attachCookiesToResponse({ res, tokenPayload });

  return res.status(StatusCodes.OK).json({ tokenPayload });
};

const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  return res.status(StatusCodes.OK).json({ msg: "User logged out" });
};

module.exports = { registerUser, loginUser, logoutUser };
