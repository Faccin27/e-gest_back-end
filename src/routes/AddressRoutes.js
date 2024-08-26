const AddressController = require('../controllers/AddressController');

async function AddressRoutes(fastify, options) {
  fastify.get('/', AddressController.getAllAddresses);
  fastify.get('/:id', AddressController.getAddressById);
  fastify.post('/', AddressController.createAddress);
  fastify.put('/:id', AddressController.updateAddress);
  fastify.delete('/:id', AddressController.deleteAddress);
}

module.exports = AddressRoutes;
