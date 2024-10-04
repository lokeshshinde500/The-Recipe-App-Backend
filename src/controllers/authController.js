import userModel from "../models/userModel.js";
import { comparePassword, encryptPassword } from "../utils/encryptPassword.js";
import genarateToken from "../utils/generateToken.js";

// 1. register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //all fields are required
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are reqiured!", success: false });
    }

    // check valid email address
    const emailRegX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegX.test(email)) {
      return res.status(400).json({
        message: "invalid email!",
        success: false,
      });
    }

    //is email already registered
    const verifyEmail = await userModel.findOne({ email: email });

    if (verifyEmail) {
      return res.status(400).json({
        message: "Email already registered!",
        success: false,
      });
    }

    // password should be at least 3 characters

    if (password.length < 3) {
      return res.status(400).json({
        message: "password should be at least 3 characters!",
        success: false,
      });
    }

    // create new user
    const encryptPass = await encryptPassword(password);

    const newUser = {
      name,
      email,
      password: encryptPass,
    };

    const createUser = await userModel.create(newUser);

    return res.status(201).json({
      message: "User Register successfully.",
      user: { ...createUser._doc, password: "" },
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// 2. login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // All fields are required
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    // email not registered
    const verifyUser = await userModel.findOne({ email: email });

    if (!verifyUser) {
      return res.status(400).json({
        message: "Email not registered!",
        success: false,
      });
    }

    // valid password
    const verifyPass = await comparePassword(password, verifyUser.password);

    if (!verifyPass) {
      return res.status(400).json({
        message: "Invalid credentials!",
        success: false,
      });
    }

    // generate token for valid user
    const token = await genarateToken(verifyUser.id);

    return res.status(200).json({
      message: "Login successfully.",
      token: token,
      user: { ...verifyUser._doc, password: "" },
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error! login", success: false });
  }
};
