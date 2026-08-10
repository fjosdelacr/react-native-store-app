import { BackgroundView } from "@/core/components/BackgroundView.component";
import { ProductFormHeader } from "../components/ProductFormHeader.component";
import { ProductForm } from "../components/ProductForm.component";
import { useEditProduct } from "../hooks/useEditProduct.hook";

export const EditProductScreen = () => {
  const { control, errors, handleSubmitProduct, isPending, isValid } =
    useEditProduct();

  return (
    <BackgroundView>
      <ProductFormHeader title="Editar producto" />
      <ProductForm
        errors={errors}
        control={control}
        disabled={!isValid}
        loading={isPending}
        onSubmit={handleSubmitProduct}
      />
    </BackgroundView>
  );
};
