const AddressDAO = require('../models/dao/AddressDAO');

class AddressController {
  async getAllAddresses(req, reply) {
    try {
      const Addresses = await AddressDAO.getAllAddresses();
      reply.send(Addresses);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Failed to retrieve Addresses' });
    }
  }

  async getAddressById(req, reply) {
    try {
      const address = await AddressDAO.getAddressById(req.params.id);
      if (address) {
        reply.send(address);
      } else {
        reply.status(404).send({ message: 'Address not found' });
      }
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Failed to retrieve address' });
    }
  }

  async createAddress(req, reply) {
    try {
      const newAddress = await AddressDAO.createAddress(req.body);
      reply.status(201).send(newAddress);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Failed to create address' });
    }
  }

  async updateAddress(req, reply) {
    try {
      const updatedAddress = await AddressDAO.updateAddress(req.params.id, req.body);
      if (updatedAddress) {
        reply.send(updatedAddress);
      } else {
        reply.status(404).send({ message: 'Address not found' });
      }
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Failed to update address' });
    }
  }

  async deleteAddress(req, reply) {
    try {
      await AddressDAO.deleteAddress(req.params.id);
      reply.status(204).send();
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Failed to delete address' });
    }
  }
}

module.exports = new AddressController();
