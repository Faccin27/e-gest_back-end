async function routes(fastify) {
  fastify.register(require('./UserRoutes'), { prefix: '/users' });
  fastify.register(require('./ClientRoutes'), { prefix: '/clients' });
  fastify.register(require('./AddressRoutes'), { prefix: '/addresses' });
}

module.exports = routes;