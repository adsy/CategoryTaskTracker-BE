// Require the framework and initiate it
const fastify = require("./server");

// Import GraphQL and Fastify-GQL
const gql = require("fastify-gql");
const schema = require("./schema");

// Register Fastify GraphQL
fastify.register(gql, {
  schema,
  graphiql: true,
});

// Import Swagger Options
const swagger = require("./config/swagger");
// Register Swagger
fastify.register(require("fastify-swagger"), swagger.options);

// Require route declarations
const routes = require("./routes");
routes.forEach((route, index) => {
  fastify.route(route);
});

// Run Server
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.swagger();
  } catch (e) {
    fastify.log.error(e);
    process.exit(1);
  }
};

start();
