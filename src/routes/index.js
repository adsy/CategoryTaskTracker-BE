const categoryController = require("../controllers/categoryController");
const taskController = require("../controllers/taskController");
const completedTaskController = require("../controllers/completedTaskController");

const routes = [
  // Location Routes
  {
    method: "GET",
    url: "/api/categories",
    handler: categoryController.getCategories,
  },
  {
    method: "GET",
    url: "/api/categories/:id",
    handler: categoryController.getSingleCategory,
  },
  {
    method: "GET",
    url: "/api/categories/:id/tasks",
    handler: taskController.getTasks,
  },
  {
    method: "GET",
    url: "/api/categories/:id/completedTasks",
    handler: completedTaskController.getCompletedTasks,
  },
  {
    method: "POST",
    url: "/api/categories",
    handler: categoryController.addCategory,
  },
  {
    method: "POST",
    url: "/api/categories/:id/tasks",
    handler: taskController.addTasks,
  },
  {
    method: "POST",
    url: "/api/categories/:id/completedTasks",
    handler: completedTaskController.addCompletedTask,
  },
  {
    method: "PUT",
    url: "/api/categories/:id",
    handler: categoryController.updateCategory,
  },
  {
    method: "DELETE",
    url: "/api/categories/:id",
    handler: categoryController.deleteCategory,
  },
  {
    method: "DELETE",
    url: "/api/categories/:id/tasks",
    handler: taskController.deleteTasks,
  },
  {
    method: "DELETE",
    url: "/api/categories/:id/tasks/:taskID",
    handler: taskController.deleteTask,
  },
  {
    method: "DELETE",
    url: "/api/categories/:id/completedTasks",
    handler: completedTaskController.deleteAllCompletedTasks,
  },
];

module.exports = routes;
