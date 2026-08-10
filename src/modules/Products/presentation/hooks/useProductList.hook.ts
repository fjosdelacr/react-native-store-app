import { useRouter } from "expo-router";
import { getProductUseCase } from "../../di/product.dependencies";
import { ProductEntity } from "../../domain/entities/product.entity";
import { useQuery } from "@tanstack/react-query";

export const useProductList = () => {
  const router = useRouter();
  const { data: products, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductUseCase.execute(),
  });

  const handleAddPress = () => {
    router.push("/products/new");
  };

  const handleEdit = (post: ProductEntity) => {
    router.push({
      pathname: `/products/[id]`,
      params: {
        id: post.id,
        title: post.title,
        description: post.description,
      },
    });
  };

  return {
    products,
    isFetching,
    handleEdit,
    handleAddPress,
  };
};
