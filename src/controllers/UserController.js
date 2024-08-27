const UserDAO = require("../models/dao/UserDAO");
const { ZodError } = require("zod");
const { userSchema, idSchema } = require("../schemas/schemas");

class UserController {
  async getAllUsers(reply) {
    const users = await UserDAO.getAllUsers();
    reply.send(users);
  }

  async getUserById(req, reply) {
    try {
      const validatedId = idSchema.parse(Number(req.params.id));
      const user = await UserDAO.getUserById(validatedId);

      if (user) {
        reply.send(user);
      } else {
        reply.status(404).send({ message: "User not found" });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        reply.status(400).send({ error: err.errors });
      } else {
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  }

  async createUser(req, reply) {
    try {
      const validatedData = userSchema.parse(req.body);
      const newUser = await UserDAO.createUser(validatedData);
      reply.status(201).send(newUser);
    } catch (err) {
      if (err instanceof ZodError) {
        reply.status(400).send({ error: err.errors });
      } else {
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  }

  async updateUser(req, reply) {
    try {
      const validatedId = idSchema.parse(Number(req.params.id));
      const validatedData = userSchema.partial().parse(req.body);

      const updateUser = await UserDAO.updateUser(validatedId, validatedData);
      reply.send(updateUser);
    } catch (err) {
      if (err instanceof ZodError) {
        reply.status(400).send({ error: err.errors });
      } else {
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  }

  async deleteUser(req, reply) {
    try {
      const validatedId = idSchema.parse(Number(req.params.id));
      await UserDAO.deleteUser(validatedId);
      reply.status(204).send();
    } catch (err) {
      if (err instanceof ZodError) {
        reply.status(400).send({ error: err.errors });
      } else {
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  }
}

module.exports = new UserController();
