const prisma = require('../Client');

class ClientDAO {
  async getAllClients() {
    return await prisma.findMany();
  }

  async getClientById(id) {
    return await prisma.findUnique({ where: { id: parseInt(id) } });
  }

  async createClient(data) {
    return await prisma.create({ data });
  }

  async updateClient(id, data) {
    return await prisma.update({ where: { id: parseInt(id) }, data });
  }

  async deleteClient(id) {
    return await prisma.delete({ where: { id: parseInt(id) } });
  }
}

module.exports = new ClientDAO();
