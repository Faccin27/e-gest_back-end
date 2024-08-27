import { z } from 'zod';

export const sexoEnum = z.enum(["Masculino", "Feminino"])


export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  pass: z.string().min(1, "Password is required").default("123"),
  sexo: sexoEnum.default("Masculino"),
  pfp: z.string().default("default.png"),
  createdAt: z.date().default(() => new Date()),
  
})


export const clientsSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  sexo: sexoEnum.default("Masculino"),
  pfp: z.string().default("default.png"),
  cpf: z.string().min(11).max(11, "CPF must be exactly 11 digits"),
  birth: z.date(),
  Address: z.array(z.object({
    cep: z.number(),
    city: z.string(),
    street: z.string(),
    state: z.string(),
    number: z.number(),
    neighboorhood: z.string(),
  })).optional(),
});

export const addressSchema = z.object({
  id: z.number().optional(),
  cep: z.number(),
  city: z.string(),
  street: z.string(),
  state: z.string(),
  number: z.number(),
  neighboorhood: z.string(),
  clientsId: z.number().optional(),
});