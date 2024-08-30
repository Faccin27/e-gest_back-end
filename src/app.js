const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const jwt = require('@fastify/jwt');
const router = require('./routes/router');

// CORS
fastify.register(cors, {
  origin: 'http://localhost:8080', /* Isso faz com que sejam aceitas apenas requisições do nosso frontend*/
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

// JWT
fastify.register(jwt, {
  secret: 'supersecret'
});

fastify.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
})

// Registrar rotas
fastify.register(router);

module.exports = fastify;
