const UserDAO = require("../models/dao/UserDAO");
const { ZodError } = require("zod");
const { userSchema, idSchema } = require("../schemas/schemas");
const bcrypt = require('bcrypt');
const fastify = require('fastify')();

class UserController {
  async register(req, reply) {
    try {
      // Adiciona a data atual ao corpo da requisição
      const dataWithCreatedAt = {
        ...req.body,
        createdAt: new Date().toISOString(),
      };

      const validatedData = userSchema.parse(dataWithCreatedAt);

      // Hash da senha
      const hashedPassword = await bcrypt.hash(validatedData.pass, 10);
      validatedData.pass = hashedPassword;

      const newUser = await UserDAO.createUser(validatedData);
      reply.status(201).send(newUser);
    } catch (err) {
      if (err instanceof ZodError) {
        reply.status(400).send({ error: err.errors });
      } else if (err.message === 'Email already exists') {
        reply.status(409).send({ error: 'Email already exists' });
      } else {
        console.error(err);
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  }

  async login(req, reply) {
    console.log(req.body)
    const { email, pass } = req.body;

    try {
      // Verifica se o usuário existe
      const user = await UserDAO.getUserByEmail(email);
      if (!user) {
        return reply.status(404).send({ message: 'User not found' });
      }

      // Verifica se a senha está correta
      const isPasswordValid = await bcrypt.compare(pass, user.pass);
      if (!isPasswordValid) {
        return reply.status(401).send({ message: 'Invalid credentials' });
      }

      // Gera o token JWT
      const token = fastify.jwt.sign({ id: user.id, email: user.email });

      reply.send({ token });
    } catch (error) {
      reply.status(500).send({ message: 'Failed to login' });
    }
  }

  async getAllUsers(req, reply) {
    try {

      const users = await UserDAO.getAllUsers();
      reply.send(users);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: "Failed to retrieve users" });
    }
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
    // Pode-se considerar não expor essa rota em uma aplicação real, 
    // já que a criação de usuários seria feita pelo registro.
    try {
      const validatedData = userSchema.parse(req.body);
      const newUser = await UserDAO.createUser(validatedData);
      reply.status(201).send(newUser);
    } catch (err) {
      if (err instanceof ZodError) {
        reply.status(400).send({ error: err.errors });
      } else if (err.message === 'Email already exists') {
        reply.status(409).send({ error: 'Email already exists' });
      } else {
        console.error(err);
        reply.status(500).send({ error: "Internal Server Error" });
      }
    }
  }

  async updateUser(req, reply) {
    try {

      const validatedId = idSchema.parse(Number(req.params.id));
      const validatedData = userSchema.partial().parse(req.body);

      const updatedUser = await UserDAO.updateUser(validatedId, validatedData);
      if (updatedUser) {
        reply.send(updatedUser);
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
