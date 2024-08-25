async function routes(fastify, options) {
    fastify.register(require('./UserRoutes'), { prefix: '/users' });
  }
  
  module.exports = routes;