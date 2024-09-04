const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

async function userRoutes(fastify, options) {
  fastify.get('/', { preHandler: [] }, UserController.getAllUsers);
  fastify.get('/:id', { preHandler: authMiddleware }, UserController.getUserById);
  fastify.get('/me', { preHandler: authMiddleware }, UserController.getLoggedUser); // Rota para o usuário logado
  fastify.post('/', { preHandler: authMiddleware }, UserController.createUser);
  fastify.post('/register', { preHandler: [] }, UserController.register);
  fastify.post('/login', { preHandler: [] }, UserController.login);
  fastify.put('/:id', { preHandler: authMiddleware }, UserController.updateUser);
  fastify.delete('/:id', { preHandler: authMiddleware }, UserController.deleteUser);
}

module.exports = userRoutes;