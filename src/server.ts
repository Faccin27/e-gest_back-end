import buildServer from './app';

const server = buildServer();

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log('Servidor rodando na porta 3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();