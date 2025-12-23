import jwt from "jsonwebtoken";
import bcrypt, { compare } from "bcryptjs";
import User from "../models/AuthModels.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All field required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hash,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Successfully registered",
      user: { name, email, role },
    });
  } catch (error) {
    console.log("register error ", error);
    return res.status(500).json({
      success: false,
      message: "server site error ",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token
    });
  } catch (error) {
    console.log("Login error", error);
    res.status(500).json({ message: "Server error" });
  }
};
