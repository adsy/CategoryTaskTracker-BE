const mongoose = require("mongoose");

const completedTaskSchema = new mongoose.Schema({
  categoryID: String,
  taskID: String,
  description: String,
  timeSpent: Number,
  date: String,
});

module.exports = mongoose.model("CompletedTask", completedTaskSchema);
