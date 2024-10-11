import createError from "http-errors";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { createSendToken } from "../libs/jwt.js";

//! controllers for: create a mixtape?

export const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    createSendToken(res, 201, user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, userName } = req.body;
    if ((!email && !userName) || !password) {
      throw createError(400, "Please provide email or username and password.");
    }
    const user =
      (email && (await User.findOne({ email }))) ||
      (userName && (await User.findOne({ userName })));
    if (!user || !(await user.isPasswordMatching(password, user.password))) {
      throw createError(401, "Incorrect login details. Login failed.");
    }
    createSendToken(res, 200, user);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwtToken", {
      success: true,
      //   add for production
      //   sameSite: "None",
      //   secure: true,
    });
    res.status(200).json({
      success: true,
      data: "User was successfully logged out.",
    });
  } catch (error) {
    next(error);
  }
};

export const protect = async (req, res, next) => {
  try {
    const jwtToken = req.cookies.jwtToken;
    if (!jwtToken) throw createError(401, "Unauthorized request");

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw createError(401, "User no longer exists.");
    req.user = user;
    req.isAuthenticated = true;

    next();
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const { user, isAuthenticated } = req;
  await user.populate("mixtapesList");
  user.password = undefined;

  res.status(200).json({
    success: true,
    user,
    isAuthenticated,
  });
};

export const updateUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { password }, { new: true });
    res.status(200).json({ message: "Update success", data: user });
  } catch (error) {
    next(error);
  }
};
