import { ProductFormHeader } from "../components/ProductFormHeader.component";
import { ProductForm } from "../components/ProductForm.component";
import { BackgroundView } from "@/core/components/BackgroundView.component";
import { useNewProduct } from "../hooks/useNewProduct.hook";

export const NewProductScreen = () => {
  const { errors, control, isValid, isPending, handleSubmitProduct } =
    useNewProduct();

  return (
    <BackgroundView>
      <ProductFormHeader title="Crear producto" />
      <ProductForm
        errors={errors}
        control={control}
        loading={isPending}
        disabled={!isValid}
        onSubmit={handleSubmitProduct}
      />
    </BackgroundView>
  );
};
