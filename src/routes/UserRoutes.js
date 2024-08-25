const UserController = require('../controllers/UserController');

async function userRoutes(fastify, options) {
  fastify.get('/', UserController.getAllUsers);
  fastify.get('/:id', UserController.getUserById);
  fastify.post('/', UserController.createUser);
  fastify.put('/:id', UserController.updateUser);
  fastify.delete('/:id', UserController.deleteUser);
}

module.exports = userRoutes;