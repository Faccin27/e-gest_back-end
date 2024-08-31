const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const router = require('./routes/router');
const jwt = require('@fastify/jwt');
const cookie = require('@fastify/cookie');

// Registrar o plugin de cookies
fastify.register(cookie);

// CORS
fastify.register(cors, {
  origin: 'http://localhost:8080', // Aceita apenas requisições do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // ESSA PORRA TAVA IMPEDINDO A BUSCA DE COOKIES
});

// Configuração do JWT
fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'sua_chave_secreta_aqui',
  cookie: {
    cookieName: 'token',
    signed: false
  }
});

// Decorador de autenticação
fastify.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ error: 'Unauthorized' });
  }
});

// Registrar rotas
fastify.register(router);

module.exports = fastify;
