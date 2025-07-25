import bcrypt from "bcryptjs";
import { generateTokenandSetCookie } from "../config/generateToken.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password doesn't match." });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generateTokenandSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        message: "User created successfully",
      });
    } else {
      res.status(400).json({ error: "Error Invalid User Data" });
    }
  } catch (error) {
    console.error(`Error in Signup Controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // console.log(username, password);
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenandSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Login Successful",
    });
  } catch (error) {
    console.error(`Error in Login Controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User Logged Out Successfully." });
  } catch (error) {
    console.error(`Error in Logout Controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
