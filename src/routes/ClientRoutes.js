const ClientController = require('../controllers/ClientController');

async function clientRoutes(fastify, options) {
  fastify.get('/', ClientController.getAllClients);
  fastify.get('/:id', ClientController.getClientById);
  fastify.post('/', ClientController.createClient);
  fastify.put('/:id', ClientController.updateClient);
  fastify.delete('/:id', ClientController.deleteClient);
}

module.exports = clientRoutes;
