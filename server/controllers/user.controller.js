const User = require("../models/User.model");
const { StatusCodes } = require("http-status-codes");
const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../errors");

const gelAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  return res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).select("-password");
  if (!user) {
    throw new NotFoundError(`No user with id: ${id}`);
  }

  return res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  return res.send("showCurrentUser");
};

const updateUserInfo = async (req, res) => {
  return res.send("updateUserInfo");
};

const updateUserPassword = async (req, res) => {
  return res.send("updateUserPassword");
};

module.exports = {
  gelAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUserInfo,
  updateUserPassword,
};
