import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z.email({ error: "Correo invalido" }),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
      .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
      .regex(/[0-9]/, "Debe contener al menos un número")
      .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),
    verifyPassword: z.string().min(1, "Debes confirmar tu contraseña"),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "Las contraseñas no coinciden",
    path: ["verifyPassword"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const RegisterDefaultValue: RegisterSchemaType = {
  email: "",
  password: "",
  verifyPassword: "",
};
