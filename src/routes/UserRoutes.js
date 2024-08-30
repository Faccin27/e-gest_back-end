const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

async function userRoutes(fastify, options) {
  fastify.get('/', { preHandler: authMiddleware }, UserController.getAllUsers);
  fastify.get('/:id', { preHandler: authMiddleware }, UserController.getUserById);
  fastify.post('/', { preHandler: authMiddleware }, UserController.createUser);
  fastify.post('/register', { preHandler: authMiddleware }, UserController.register);
  fastify.post('/login', { preHandler: authMiddleware }, UserController.login);
  fastify.put('/:id', { preHandler: authMiddleware }, UserController.updateUser);
  fastify.delete('/:id', { preHandler: authMiddleware }, UserController.deleteUser);
}

module.exports = userRoutes;