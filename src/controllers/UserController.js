const UserDAO = require('../models/dao/UserDAO');

class UserController {
  async getAllUsers(req, reply) {
    const users = await UserDAO.getAllUsers();
    reply.send(users);
  }

  async getUserById(req, reply) {
    const user = await UserDAO.getUserById(req.params.id);
    if (user) {
      reply.send(user);
    } else {
      reply.status(404).send({ message: 'User not found' });
    }
  }

  async createUser(req, reply) {
    const newUser = await UserDAO.createUser(req.body);
    reply.status(201).send(newUser);
  }

  async updateUser(req, reply) {
    const updatedUser = await UserDAO.updateUser(req.params.id, req.body);
    reply.send(updatedUser);
  }

  async deleteUser(req, reply) {
    await UserDAO.deleteUser(req.params.id);
    reply.status(204).send();
  }
}

module.exports = new UserController();