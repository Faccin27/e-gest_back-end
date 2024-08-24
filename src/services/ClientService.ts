import prisma from '../prismaClient';

export const createNewClient = async (data: any) => {
  return await prisma.clients.create({
    data: {
      email: data.email,
      name: data.name,
      pfp: data.pfp,
      cpf: data.cpf,
      birth: new Date(data.birth),
      Address: {
        create: data.address,
      }
    },
  });
};

export const fetchClients = async () => {
  return await prisma.clients.findMany({
    include: {
      Address: true,
    },
  });
};