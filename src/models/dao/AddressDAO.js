const prisma = require('../Address');

class AddressDAO {
  async getAllAddresses() {
    return await prisma.findMany();
  }

  async getAddressById(id) {
    return await prisma.findUnique({ where: { id: parseInt(id) } });
  }

  async createAddress(data) {
    return await prisma.create({ data });
  }

  async updateAddress(id, data) {
    return await prisma.update({ where: { id: parseInt(id) }, data });
  }

  async deleteAddress(id) {
    return await prisma.delete({ where: { id: parseInt(id) } });
  }
}

module.exports = new AddressDAO();