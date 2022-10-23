const asyncHandler = require("express-async-handler");

const Log = require("../models/logModel");
const User = require("../models/userModel");

// @desc Get All logs
// @route GET /api/logs/getAll
// @access Private
const getAllLogs = asyncHandler(async (req, res) => {
  const logs = await Log.find();
  res.status(200).json(logs);
});

// @desc Get logs for logged in user
// @route GET /api/logs
// @access Private
const getLogs = asyncHandler(async (req, res) => {
  const logs = await Log.find({ user: req.user.id });
  res.status(200).json(logs);
});

// @desc Create Log
// @route POST /api/logs
// @access Private
const createLog = asyncHandler(async (req, res) => {
  const { age, temperature, location, latitude, longitude, symptoms } =
    req.body;

  if (!age || !temperature || !location) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const log = await Log.create({
    age,
    temperature,
    location,
    latitude,
    longitude,
    symptoms,
    user: req.user.id,
  });

  res.status(200).json(log);
});

// @desc Update log
// @route PUT /api/logs/:id
// @access Private
const updateLog = asyncHandler(async (req, res) => {
  const log = await Log.findById(req.params.id);

  if (!log) {
    res.status(400);
    throw new Error("Log not found!");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the log user
  if (log.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedLog = await Log.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedLog);
});

// @desc Delete log
// @route DELETE /api/logs/:id
// @access Private
const deleteLog = asyncHandler(async (req, res) => {
  const log = await Log.findById(req.params.id);
  if (!log) {
    res.status(400);
    throw new Error("Log not found!");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the log user
  if (log.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await log.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getLogs,
  createLog,
  updateLog,
  deleteLog,
  getAllLogs,
};
