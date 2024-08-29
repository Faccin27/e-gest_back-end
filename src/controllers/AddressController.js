const AddressDAO = require('../models/dao/AddressDAO');
const { addressSchema, idSchema } = require('../schemas/schemas');
const { ZodError } = require('zod');  // Adicione esta linha

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
      const validatedId = idSchema.parse(Number(req.params.id))

      const address = await AddressDAO.getAddressById(validatedId);
      if (address) {
        reply.send(address);
      } else {
        reply.status(404).send({ message: 'Address not found' });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        reply.status(400).send({ error: err.errors });
      } else {
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  }

  async createAddress(req, reply) {
    try {
      console.log(req.body)
      const validatedAddress = addressSchema.parse(req.body)
      const newAddress = await AddressDAO.createAddress(validatedAddress);
      reply.status(201).send(newAddress);
    } catch (err) {
      if (err instanceof ZodError) {
        reply.status(400).send({ error: err.errors });
      } else {
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  }

  async updateAddress(req, reply) {
    try {
      const validatedId = idSchema.parse(Number(req.params.id))
      const validatedAddress = addressSchema.parse(req.body)

      const updatedAddress = await AddressDAO.updateAddress(validatedId, validatedAddress);
      if (updatedAddress) {
        reply.send(updatedAddress);
      } else {
        reply.status(404).send({ message: 'Address not found' });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        reply.status(400).send({ error: err.errors });
      } else {
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  }

  async deleteAddress(req, reply) {
    try {
      const validatedId = idSchema.parse(Number(req.params.id))
      await AddressDAO.deleteAddress(validatedId);
      reply.status(204).send();
    } catch (err) {
      if (err instanceof ZodError) {
        reply.status(400).send({ error: err.errors });
      } else {
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  }
}

module.exports = new AddressController();