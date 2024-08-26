const ClientDAO = require('../models/dao/ClientDAO');

class ClientController {
  async getAllClients(req, reply) {
    try {
      const clients = await ClientDAO.getAllClients();
      reply.send(clients);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Failed to retrieve clients' });
    }
  }

  async getClientById(req, reply) {
    try {
      const client = await ClientDAO.getClientById(req.params.id);
      if (client) {
        reply.send(client);
      } else {
        reply.status(404).send({ message: 'Client not found' });
      }
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Failed to retrieve client' });
    }
  }

  async createClient(req, reply) {
    try {
      const newClient = await ClientDAO.createClient(req.body);
      reply.status(201).send(newClient);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Failed to create client' });
    }
  }

  async updateClient(req, reply) {
    try {
      const updatedClient = await ClientDAO.updateClient(req.params.id, req.body);
      if (updatedClient) {
        reply.send(updatedClient);
      } else {
        reply.status(404).send({ message: 'Client not found' });
      }
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Failed to update client' });
    }
  }

  async deleteClient(req, reply) {
    try {
      await ClientDAO.deleteClient(req.params.id);
      reply.status(204).send();
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Failed to delete client' });
    }
  }
}

module.exports = new ClientController();
