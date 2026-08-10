import { useState } from "react";
import { deleteProductUseCase } from "../../di/product.dependencies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useDeleteProduct = () => {
  const [productId, setProductId] = useState<string>("");
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const queryClient = useQueryClient();

  const hiddenModal = () => setIsVisibleModal(false);
  const showModal = () => setIsVisibleModal(true);

  const { mutate, isPending } = useMutation({
    mutationKey: ["products"],
    mutationFn: (productId: string) => deleteProductUseCase.execute(productId),
  });

  const handleDelete = (id: string) => {
    setProductId(id);
    showModal();
  };

  const confirmDelete = () => {
    mutate(productId, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["products"],
        });
      },
      onError: (error) => {
        Alert.alert(error.name, error.message);
      },
    });
    hiddenModal();
    setProductId("");
  };

  return {
    isPending,
    hiddenModal,
    handleDelete,
    confirmDelete,
    isVisibleModal,
  };
};
