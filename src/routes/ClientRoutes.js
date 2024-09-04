const ClientController = require('../controllers/ClientController');
const authMiddleware = require('../middleware/authMiddleware');

async function clientRoutes(fastify, options) {
  fastify.get('/', { preHandler: authMiddleware }, ClientController.getAllClients);
  fastify.get('/:id', { preHandler: authMiddleware }, ClientController.getClientById);
  fastify.post('/', { preHandler: authMiddleware }, ClientController.createClient);
  fastify.put('/:id', { preHandler: authMiddleware }, ClientController.updateClient);
  fastify.delete('/:id', { preHandler: authMiddleware }, ClientController.deleteClient);
}

module.exports = clientRoutes;
