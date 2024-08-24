import { FastifyInstance } from 'fastify';
import { createClient, getClients } from '../controllers/clientController';

async function clientRoutes(fastify: FastifyInstance) {
  fastify.post('/', createClient);
  fastify.get('/', getClients);
}

export default clientRoutes;