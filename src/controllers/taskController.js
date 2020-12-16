const boom = require("boom");

const Task = require("../models/Tasks");

exports.getTasks = async (req, reply) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    console.log(id);
    const tasks = Task.find({ categoryID: id });
    return tasks;
  } catch (e) {
    throw boom.boomify(e);
  }
};

exports.addTasks = async (req, reply) => {
  try {
    let task = new Task(req.body);
    return task.save();
  } catch (e) {
    throw boom.boomify(e);
  }
};

exports.deleteTasks = async (req, reply) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const deleted = await Task.deleteMany({ categoryID: id });
    return deleted;
  } catch (e) {
    throw boom.boomify(e);
  }
};

exports.deleteTask = async (req, reply) => {
  try {
    const taskID = req.params === undefined ? req.taskID : req.params.taskID;
    const deleted = await Task.deleteOne({ _id: taskID });
    return deleted;
  } catch (e) {
    throw boom.boomify(e);
  }
};
