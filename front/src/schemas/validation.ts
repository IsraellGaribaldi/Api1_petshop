import { z } from "zod";
import { createClienteSchema, updateClienteSchema } from "../schemas/clienteSchemas";


export const validateCreateCliente = (data: unknown) => {
  try {
    const validatedData = createClienteSchema.parse(data);
    return { success: true as const, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      for (const issue of error.issues) {
        const key = issue.path.join(".");
        errors[key] = issue.message;
      }
      return { success: false as const, errors };
    }
    throw error;
  }
};

export const validateUpdateCliente = (data: unknown) => {
  try {
    const validatedData = updateClienteSchema.parse(data);
    return { success: true as const, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      for (const issue of error.issues) {
        const key = issue.path.join(".");
        errors[key] = issue.message;
      }
      return { success: false as const, errors };
    }
    throw error;
  }
};
