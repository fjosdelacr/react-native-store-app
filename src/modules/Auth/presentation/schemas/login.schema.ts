import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email({error: "Correo invalido"}),
  password: z
  .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const LoginDefaultValue: LoginSchemaType = {
    email: "",
    password: "",
}