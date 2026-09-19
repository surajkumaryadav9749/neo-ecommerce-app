const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //check user email and password
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All data are required", success: false });
    }

    //check email not exist already
    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res
        .status(400)
        .json({ message: "User already exists, please login", success: false });
    }

    //hash password
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    console.log(`new User: ${newUser}`);

    const token = generateToken(newUser._id);

    console.log(`Token is : ${token}`);

    const response = await User.findById(newUser._id).select("-password");

    res.status(201).json({
      message: "user created successfully",
      user: response,
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

//login controller
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    //check user
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "user not found", success: false });
    }

    //check password
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res
        .status(400)
        .json({ message: "Incorrect password", success: false });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "user loggedIn successfully",
      success: true,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

//get profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, userLogin, getProfile };
