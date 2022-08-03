const express = require("express");
const { authenticateUser } = require("../middleware/authentication.middleware");
const {
  gelAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUserInfo,
  updateUserPassword,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.route("/").get(authenticateUser, gelAllUsers);
userRouter.route("/showMe").get(showCurrentUser);
userRouter.route("/updateUserInfo").patch(updateUserInfo);
userRouter.route("/updateUserPassword").post(updateUserPassword);
userRouter.route("/:id").get(authenticateUser, getSingleUser);

module.exports = userRouter;
