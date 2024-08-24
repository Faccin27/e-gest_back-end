import Fastify from 'fastify';
import ClientRoutes from './routes/ClientRoutes';

const buildServer = () => {
  const server = Fastify();

  server.register(ClientRoutes, { prefix: '/clients' });

  return server;
};

export default buildServer;