const boom = require("boom");

const CompletedTask = require("../models/CompletedTask");

exports.getCompletedTasks = async (req, reply) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const completedTasks = CompletedTask.find({ categoryID: id });
    return completedTasks;
  } catch (e) {
    return boom.boomify(e);
  }
};

exports.addCompletedTask = (req, reply) => {
  try {
    let completedTask = new CompletedTask(req.body);
    return completedTask.save();
  } catch (e) {
    return boom.boomify(e);
  }
};

exports.deleteAllCompletedTasks = async (req, reply) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const deleted = await CompletedTask.deleteMany({ categoryID: id });
    return deleted;
  } catch (e) {
    return boom.boomify(e);
  }
};
