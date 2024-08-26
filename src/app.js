const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const router = require('./routes/router');

// CORS
fastify.register(cors, {
  origin: 'http://localhost:8080', /* Isso faz com que sejam aceitas apenas requisições do nosso frontend*/
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

// Registrar rotas
fastify.register(router);

module.exports = fastify;
