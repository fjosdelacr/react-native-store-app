import { z } from "zod";

export const ProductSchema = z.object({
  title: z.string().min(1, { error: "El título es obligatorio" }),
  description: z.string().optional(),
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;

export const ProductDefaultValue: ProductSchemaType = {
  title: "",
  description: undefined,
};
