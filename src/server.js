// Require fastify framework and instantiate it
const fastify = require("fastify")({ logger: true });

// Require external module for mongoose
const mongoose = require("mongoose");

// Enable the fastify CORS plugin
fastify.register(require("fastify-cors"), {
  origin: "*",
  credentials: true,
});

// Connect to the DB after starting server
mongoose
  .connect("mongodb://localhost/categoryToDo")
  .then(() => {
    console.log("DB has been connected");
  })
  .catch((err) => console.log(err));

module.exports = fastify;
