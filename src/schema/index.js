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

// Define Object Types
const categoryType = new GraphQLObjectType({
  name: "Location",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
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
  },
});

// Define Mutations
const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    addLocation: {
      type: categoryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const data = await categoryController.addCategory(args);
        return data;
      },
    },
    editLocation: {
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
    deleteLocation: {
      type: categoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const data = await categoryController.deleteCategory(args);
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
