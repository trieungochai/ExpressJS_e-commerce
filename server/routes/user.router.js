const express = require("express");
const {
  gelAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUserInfo,
  updateUserPassword,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.route("/").get(gelAllUsers);
userRouter.route("/showMe").get(showCurrentUser);
userRouter.route("/:id").get(getSingleUser);
userRouter.route("/updateUserInfo").post(updateUserInfo);
userRouter.route("/updateUserPassword").post(updateUserPassword);

module.exports = userRouter;
