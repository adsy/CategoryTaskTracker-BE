const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  categoryID: String,
  description: String,
});

module.exports = mongoose.model("Task", taskSchema);
