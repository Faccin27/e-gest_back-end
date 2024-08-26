const prisma = require('../Client');

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
