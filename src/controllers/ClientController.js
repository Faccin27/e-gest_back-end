const { ZodError } = require("zod");
const ClientDAO = require("../models/dao/ClientDAO");
const { idSchema, clientsSchema } = require("../schemas/schemas");

class ClientController {
  async getAllClients(req, reply) {
    try {
      const clients = await ClientDAO.getAllClients();
      reply.send(clients);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: "Failed to retrieve clients" });
    }
  }

  async getClientById(req, reply) {
    try {
      const validatedId = idSchema.parse(Number(req.params.id));

      const client = await ClientDAO.getClientById(validatedId);
      if (client) {
        reply.send(client);
      } else {
        reply.status(404).send({ message: "Client not found" });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        reply.status(400).send({ error: err.errors });
      } else {
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  }

  async createClient(req, reply) {
    try {
      const validetedClient = clientsSchema.parse(req.body);

      const newClient = await ClientDAO.createClient(validetedClient);
      reply.status(201).send(newClient);
    } catch (err) {
      if (err instanceof ZodError) {
        reply.status(400).send({ error: err.errors });
      } else {
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  }

  async updateClient(req, reply) {
    try {
      const validatedId = idSchema.parse(Number(req.params.id));
      const validatedClient = clientsSchema.parse(req.body);

      const updatedClient = await ClientDAO.updateClient(
        validatedId,
        validatedClient
      );
      if (updatedClient) {
        reply.send(updatedClient);
      } else {
        reply.status(404).send({ message: "Client not found" });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        reply.status(400).send({ error: err.errors });
      } else {
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  }

  async deleteClient(req, reply) {
    try {
      const validatedId = idSchema.parse(Number(req.params.id));
      await ClientDAO.deleteClient(validatedId);
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

module.exports = new ClientController();
