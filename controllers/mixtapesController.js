import createError from "http-errors";
import Mixtape from "../models/Mixtape.js";
import User from "../models/User.js";

export const getPublicMixtapes = async (req, res, next) => {
  try {
    const publicMixtapes = await Mixtape.find({ isPublic: true }).populate(
      "creator",
      "userName"
    );
    res.status(200).json({ success: true, data: publicMixtapes });
  } catch (error) {
    next(error);
  }
};

export const getMixtape = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mixtape = await Mixtape.findOne({ _id: id });
    res.status(200).json({ success: true, data: mixtape });
  } catch (error) {
    next(error);
  }
};

export const createMixtape = async (req, res, next) => {
  try {
    const newMixtape = await Mixtape.create(req.body);
    const user = await User.findById(req.user._id);
    newMixtape.creator = user._id;
    await newMixtape.save();
    user.mixtapesList.push(newMixtape._id);
    await user.save();
    res.status(201).json({ success: true, user, data: newMixtape });
  } catch (error) {
    next(error);
  }
};

export const updateMixtape = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { playlist, isPublic, name } = req.body;

    const updateData = {};
    if (playlist !== undefined) updateData.playlist = playlist;
    if (isPublic !== undefined) updateData.isPublic = isPublic;
    if (name !== undefined) updateData.name = name;

    const mixtape = await Mixtape.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({ message: "Update success", data: mixtape });
  } catch (error) {
    next(error);
  }
};

export const deleteMixtape = async (req, res, next) => {
  try {
    const { id } = req.params;
    const mixtape = await Mixtape.findOneAndDelete({ _id: id });
    const user = await User.findByIdAndUpdate(
      mixtape.creator,
      { $pull: { mixtapesList: id } },
      { new: true }
    );
    res.status(204).json({ success: true, message: "Mixtape deleted." });
  } catch (error) {
    next(error);
  }
};
