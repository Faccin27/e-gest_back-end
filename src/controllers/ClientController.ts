import { FastifyReply, FastifyRequest } from 'fastify';
import { createNewClient, fetchClients } from '../services/ClientService';

export const createClient = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const client = await createNewClient(request.body);
    reply.status(201).send(client);
  } catch (error) {
    reply.status(400).send({ error: 'error.message' });
  }
};

export const getClients = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const clients = await fetchClients();
    reply.status(200).send(clients);
  } catch (error) {
    reply.status(400).send({ error: 'error.message' });
  }
};  