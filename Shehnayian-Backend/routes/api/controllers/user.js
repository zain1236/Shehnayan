import express from "express";
import { check, validationResult } from "express-validator";
import dotenv from "dotenv";

// dotenv config
dotenv.config();

// http status codes
import { StatusCodes } from "http-status-codes";

// middlewares
import { userValidator } from "../middlewares/user.js";

// auth
import auth from "../middlewares/auth.js";

// services
import { addUserToDB } from "../services/user.js";

// models
import User from "../../../models/User.js";

// utils
import { handleErrors } from "../../../utils/handleError.js";
import {
  validateUserCredentials,
  getUserByEmail,
  getJSONWebToken,
  getUserId,
  generatePasswordHash,
} from "../../../utils/user.js";

//router
const Router = express.Router();

// @route             POST api/v1/user/signup
// @description       user signup Route
// @access            Public

Router.post("/signup", [userValidator], async (req, res) => {
  await addUserToDB(req.body);
  const { userType } = req.body;
  const token = await getToken(req.body.email, userType);
  return res.status(StatusCodes.OK).json({ token });
});

// @route             POST api/user/v1/login
// @description       user login Route
// @access            Public
Router.post(
  "/login",
  [
    check("email", "Please include a valid Email").isEmail(),
    check("password", "Please enter a password").exists(),
    check("userType", "Please enter a valid user type").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    // validate user credentials
    const isUserValid = await handleErrors(validateUserCredentials, req.body);
    const user = await handleErrors(getUserByEmail, req.body.email);
    if (!isUserValid || user.userType !== req.body.userType) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: [{ msg: "Invalid Credentials" }] });
    } else {
      const email = req.body.email;
      const type = req.body.userType;
      const token = await getToken(email, type);
      return res.status(StatusCodes.OK).json({ token });
    }
  }
);

// @route    PATCH api/v1/user/edit
// @desc     Update user information
// @access   Private

Router.patch("/edit", [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  const { fullName, password, mobile, address } = req.body;

  // build profle object
  const userInfoFields = {};
  if (fullName) userInfoFields.fullName = fullName;
  if (mobile) userInfoFields.mobile = mobile;
  if (address) userInfoFields.address = address;
  if (password) {
    userInfoFields.password = await handleErrors(
      generatePasswordHash,
      password
    );
  }
  try {
    let user = await User.findOne({ _id: req.user.userID });
    if (user) {
      // update
      await User.findOneAndUpdate({ _id: req.user.userID }, userInfoFields);
      user = await User.findOne({ _id: req.user.userID });
      return res.send(user);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @access  Public
// @desc    Get all the Users
// @route   GET -> /api/v1/user/

Router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// helper function to generate json web token
async function getToken(email, type) {
  const payload = {
    userID: await handleErrors(getUserId, email),
    type: type,
  };
  const token = await getJSONWebToken(payload);
  return token;
}

export default Router;
