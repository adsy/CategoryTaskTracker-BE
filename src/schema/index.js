const graphql = require("graphql");

// Destructure GraphQL functions
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// import controllers
const categoryController = require("../controllers/categoryController");

const taskController = require("../controllers/taskController");

const completedTaskController = require("../controllers/completedTaskController");

// Define Object Types
const categoryType = new GraphQLObjectType({
  name: "Location",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

const taskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    _id: { type: GraphQLID },
    categoryID: {
      type: categoryType,
      async resolve(parent, args) {
        return await categoryController.getSingleCategory({
          id: parent._id,
        });
      },
    },
    description: { type: GraphQLString },
  }),
});

const completedTaskType = new GraphQLObjectType({
  name: "CompletedTask",
  fields: () => ({
    _id: { type: GraphQLID },
    categoryID: {
      type: categoryType,
      async resolve(parent, args) {
        return await categoryController.getSingleCategory({
          id: parent._id,
        });
      },
    },
    taskID: {
      type: taskType,
      async resolve(parent, args) {
        return await taskController.getTasks({
          id: parent._id,
        });
      },
    },
    description: { type: GraphQLString },
    timeSpent: { type: GraphQLInt },
  }),
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    category: {
      type: categoryType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await categoryController.getSingleCategory(args);
      },
    },
    categories: {
      type: categoryType,
      async resolve(parent, args) {
        return await categoryController.getCategories();
      },
    },
    tasks: {
      type: taskType,
      async revolve(parent, args) {
        return await taskController.getTasks();
      },
    },
    completedTasks: {
      type: taskType,
      async revolve(parent, args) {
        return await completedTaskController.getCompletedTasks();
      },
    },
  },
});

// Define Mutations
const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    addCategory: {
      type: categoryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const data = await categoryController.addCategory(args);
        return data;
      },
    },
    editCategory: {
      type: categoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const data = await categoryController.updateCategory(args);
        return data;
      },
    },
    deleteCategory: {
      type: categoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const data = await categoryController.deleteCategory(args);
        return data;
      },
    },
    addTask: {
      type: taskType,
      args: {
        categoryID: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const data = await taskController.addTasks(args);
        return data;
      },
    },
    deleteTask: {
      type: taskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const data = await taskController.deleteTask(args);
        return data;
      },
    },
    deleteTasks: {
      type: taskType,
      args: {
        categoryID: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const data = await taskController.deleteTasks(args);
        return data;
      },
    },
    addCompletedTask: {
      type: completedTaskType,
      args: {
        categoryID: { type: new GraphQLNonNull(GraphQLString) },
        taskID: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        timeSpent: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        const data = await completedTaskController.addCompletedTask(args);
        return data;
      },
    },
    deleteCompletedTasks: {
      type: completedTaskType,
      args: {
        categoryID: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const data = await completedTaskController.deleteAllCompletedTasks(
          args
        );
        return data;
      },
    },
  },
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
