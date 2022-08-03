const User = require("../models/User.model");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../errors");

const gelAllUsers = async (req, res) => {
  return res.send("gelAllUser");
};

const getSingleUser = async (req, res) => {
  return res.send("getSingleUser");
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
