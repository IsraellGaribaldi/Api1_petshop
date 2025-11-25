import { z } from "zod";

export const petSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome do pet deve ter pelo menos 2 caracteres")
    .max(255, "Nome do pet não pode ter mais de 255 caracteres"),

  especie: z
    .string()
    .min(2, "Espécie deve ter pelo menos 2 caracteres")
    .max(255, "Espécie não pode ter mais de 255 caracteres"),

  raça: z
    .string()
    .min(2, "Raça deve ter pelo menos 2 caracteres")
    .max(255, "Raça não pode ter mais de 255 caracteres"),

  idade: z
    .number()
    .int("Idade deve ser um número inteiro")
    .nonnegative("Idade não pode ser negativa"),
});

export const createClienteSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(255, "Nome não pode ter mais de 255 caracteres"),

  telefone: z
    .string()
    .regex(/^\d{10,11}$/, "Telefone deve conter 10 ou 11 dígitos"),

  endereco: z
    .string()
    .min(5, "Endereço deve ter pelo menos 5 caracteres")
    .max(255, "Endereço não pode ter mais de 255 caracteres"),

  email: z.string().email("Email inválido"),

  // Pet é opcional (igual na interface)
  pet: petSchema.optional(),
});

export const updateClienteSchema = createClienteSchema.extend({
  id: z.number(),
});

export type CreateClienteInput = z.infer<typeof createClienteSchema>;
export type UpdateClienteInput = z.infer<typeof updateClienteSchema>;
