const categoryController = require("../controllers/categoryController");

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
    method: "POST",
    url: "/api/categories",
    handler: categoryController.addCategory,
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
];

module.exports = routes;
