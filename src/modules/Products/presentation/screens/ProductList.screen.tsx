import {
  View,
  FlatList,
  ActivityIndicator,
  ListRenderItemInfo,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { BackgroundView } from "@/core/components/BackgroundView.component";
import { ProductCard } from "../components/ProductCard.component";
import { Header } from "../../../../core/components/Header.component";
import { useProductList } from "../hooks/useProductList.hook";
import { CustomModal } from "@/core/components/CustomModal.component";
import { useThemeContext } from "@/core/contexts/theme.context";
import { ProductEntity } from "../../domain/entities/product.entity";
import { useDeleteProduct } from "../hooks/useDeleteProduct.hook";

export const ProductListScreen = () => {
  const { palette } = useThemeContext();
  const { isFetching, products, handleEdit, handleAddPress } = useProductList();
  const {
    isPending,
    hiddenModal,
    handleDelete,
    confirmDelete,
    isVisibleModal,
  } = useDeleteProduct();

  const renderItem = ({ item }: ListRenderItemInfo<ProductEntity>) => {
    return (
      <ProductCard
        title={item.title}
        description={item.description}
        onEdit={() => handleEdit(item)}
        onDelete={() => handleDelete(item.id ?? "")}
      />
    );
  };

  if (isFetching || isPending) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          size={"large"}
          color={palette.colors.primary.default}
        />
      </View>
    );
  }

  return (
    <>
      <BackgroundView>
        <Header
          title="Mi Lista"
          icon={{ name: "plus", component: Feather }}
          onPress={handleAddPress}
        />
        <FlatList
          data={products}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </BackgroundView>
      <CustomModal
        onCancel={hiddenModal}
        visible={isVisibleModal}
        onConfirm={confirmDelete}
        title={`¿Desea eliminar titulo?`}
        message="Al eliminar el titulo no podra ser recuperado"
      />
    </>
  );
};
