const prisma = require('../User');

class UserDAO {
  async getAllUsers() {
    return await prisma.findMany();
  }

  async getUserById(id) {
    return await prisma.findUnique({ where: { id: parseInt(id) } });
  }

  async createUser(data) {
    return await prisma.create({ data });
  }

  async updateUser(id, data) {
    return await prisma.update({ where: { id: parseInt(id) }, data });
  }

  async deleteUser(id) {
    return await prisma.delete({ where: { id: parseInt(id) } });
  }
}

module.exports = new UserDAO();