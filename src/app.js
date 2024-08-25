const fastify = require('fastify')({ logger: true });
const router = require('./routes/router');

fastify.register(router);

module.exports = fastify;
