const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ClientDAO {
  async getAllClients() {
    return await prisma.clients.findMany({
      include: {
        Address: true,
      },
    });
  }

  async getClientById(id) {
    return await prisma.clients.findUnique({
      where: { id: parseInt(id) },
      include: {
        Address: true,
      },
    });
  }

  async getClientByEmailorCpf(email, cpf) {
    return await
      prisma.clients.findFirst({
        where: {
          OR: [
            { email: email },
            { cpf: cpf },
          ],
        }
      })
  }

  async createClient(data) {
    return await prisma.clients.create({ data });
  }

  async updateClient(id, data) {
    return await prisma.clients.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async deleteClient(id) {
    return await prisma.clients.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = new ClientDAO();
