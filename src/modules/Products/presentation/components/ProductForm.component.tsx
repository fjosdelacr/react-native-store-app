import { CustomButton } from "@/core/components/CustomButton.component";
import { InputField } from "@/core/components/InputField.components";
import { FC } from "react";
import { Control, FieldErrors } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ProductSchemaType } from "../schemas/product.schema";

interface ProductFormProps {
  loading?: boolean;
  disabled?: boolean;
  onSubmit: () => void;
  control: Control<ProductSchemaType>;
  errors: FieldErrors<ProductSchemaType>;
}

export const ProductForm: FC<ProductFormProps> = ({
  errors,
  control,
  loading,
  disabled,
  onSubmit,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <InputField
              name="title"
              label="Título"
              control={control}
              error={errors.title}
              placeholder="Escribe un título"
            />
            <InputField
              multiline
              label="Mensaje"
              control={control}
              name="description"
              numberOfLines={600}
              textAlignVertical="top"
              error={errors.description}
              placeholder="¿Qué está pasando?"
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <CustomButton
              title={loading ? "Cargando..." : "Publicar"}
              onPress={onSubmit}
              disabled={disabled}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  formContainer: {
    gap: 24,
  },
});
