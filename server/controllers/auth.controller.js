const { StatusCodes } = require("http-status-codes");
const User = require("../models/User.model");
const { UnauthenticatedError, BadRequestError } = require("../errors");

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

  return res.status(StatusCodes.CREATED).json({ newUser });
};

const loginUser = async (req, res) => {};

const logoutUser = async (req, res) => {};

module.exports = { registerUser, loginUser, logoutUser };
