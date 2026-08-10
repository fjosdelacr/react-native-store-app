import { useState } from "react";
import { useRouter } from "expo-router";
import { createProductUseCase } from "../../di/product.dependencies";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ProductDefaultValue,
  ProductSchema,
  ProductSchemaType,
} from "../schemas/product.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useNewProduct = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: ProductDefaultValue,
    resolver: zodResolver(ProductSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["products"],
    mutationFn: (product: ProductSchemaType) =>
      createProductUseCase.execute(product),
  });

  const onSubmit = (product: ProductSchemaType) => {
    mutate(product, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        router.push("/products");
      },
      onError: (error) => {
        Alert.alert(error.name, error.message);
      },
    });
  };

  const handleSubmitProduct = handleSubmit(onSubmit);

  return {
    errors,
    control,
    isValid,
    isPending,
    handleSubmitProduct,
  };
};
