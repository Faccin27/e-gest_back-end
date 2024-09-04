const AddressController = require('../controllers/AddressController');
const authMiddleware = require('../middleware/authMiddleware');

async function AddressRoutes(fastify, options) {
  fastify.get('/', { preHandler: authMiddleware }, AddressController.getAllAddresses);
  fastify.get('/:id', { preHandler: authMiddleware }, AddressController.getAddressById);
  fastify.post('/', { preHandler: authMiddleware }, AddressController.createAddress);
  fastify.put('/:id', { preHandler: authMiddleware }, AddressController.updateAddress);
  fastify.delete('/:id', { preHandler: authMiddleware }, AddressController.deleteAddress);
}

module.exports = AddressRoutes;
