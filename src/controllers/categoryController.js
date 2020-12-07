// External Dependencies - boom provides handling for http errors
const boom = require("boom");

const Category = require("../models/Category");

exports.getCategories = async (req, reply) => {
  try {
    const categories = Category.find();
    return categories;
  } catch (e) {
    throw boom.boomify(e);
  }
};

exports.getSingleCategory = async (req, reply) => {
  try {
    // get the id from the parameters
    const id = req.params === undefined ? req.id : req.params.id;
    console.log(id);
    const category = Category.findById(id);
    return category;
  } catch (e) {
    throw boom.boomify(e);
  }
};

exports.addCategory = async (req, reply) => {
  try {
    console.log("trying here");
    console.log(req.body);
    // grabs the details of category in the request body
    let category = new Category(req.body);
    // saves new category to mongo DB

    console.log(category);
    return category.save();
  } catch (e) {
    console.log(e);
  }
};

exports.updateCategory = async (req, reply) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    // grab updated category from body of request
    const updatedLoc = req.body === undefined ? req : req.body;
    // desctructure the body to get a new object
    const { ...updateData } = updatedLoc;
    const update = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return update;
  } catch (e) {
    throw boom.boomify(e);
  }
};

exports.deleteCategory = async (req, reply) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const deleted = await Category.findByIdAndRemove(id);
    return deleted;
  } catch (e) {
    throw boom.boomify(e);
  }
};
