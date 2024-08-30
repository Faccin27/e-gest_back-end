const authMiddleware = require('../middleware/authMiddleware')

async function routes(fastify) {
  fastify.register(require('./UserRoutes'), { prefix: '/users', preHandler: authMiddleware });
  fastify.register(require('./ClientRoutes'), { prefix: '/clients', preHandler: authMiddleware });
  fastify.register(require('./AddressRoutes'), { prefix: '/addresses', preHandler: authMiddleware });

  
}

module.exports = routes;