import { useLocalSearchParams, useRouter } from "expo-router";
import { ProductEntity } from "../../domain/entities/product.entity";
import { updateProductUseCase } from "../../di/product.dependencies";
import { useForm } from "react-hook-form";
import {
  ProductSchema,
  ProductSchemaType,
} from "../schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useEditProduct = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const params = useLocalSearchParams() as unknown as ProductEntity;
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: params.title,
      description: params.description,
    },
    resolver: zodResolver(ProductSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["products"],
    mutationFn: (product: ProductSchemaType) =>
      updateProductUseCase.execute({ id: params.id, ...product }),
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

  return { errors, control, isValid, isPending, handleSubmitProduct };
};
