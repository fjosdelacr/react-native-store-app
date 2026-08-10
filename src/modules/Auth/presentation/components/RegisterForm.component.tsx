import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { CustomButton } from "@/core/components/CustomButton.component";
import { InputField } from "@/core/components/InputField.components";
import { useThemeContext } from "@/core/contexts/theme.context";
import { Control, FieldErrors } from "react-hook-form";
import { RegisterSchemaType } from "../schemas/register.schema";

interface RegisterFormProps {
  onSubmit: VoidFunction;
  control: Control<RegisterSchemaType>;
  errors: FieldErrors<RegisterSchemaType>;
}

export const RegisterForm: FC<RegisterFormProps> = ({
  errors,
  control,
  onSubmit,
}) => {
  const { palette } = useThemeContext();

  return (
    <View>
      <Text style={styles.title}>Crear Cuenta</Text>
      <Text style={[styles.subtitle, { color: palette.texts.secondary }]}>
        Registrate para continuar
      </Text>
      <View style={styles.inputGroup}>
        <InputField
          name="email"
          label="Correo"
          control={control}
          error={errors.email}
          placeholder="Ingresar correo"
        />
        <InputField
          name="password"
          secureTextEntry
          control={control}
          label="Contraseña"
          error={errors.password}
          placeholder="Ingresar contraseña"
        />
        <InputField
          secureTextEntry
          control={control}
          name="verifyPassword"
          label="Confirmar Contraseña"
          error={errors.verifyPassword}
          placeholder="Ingresar contraseña"
        />
      </View>
      <CustomButton title="Registrarse" onPress={onSubmit} />
      <View style={styles.signin}>
        <Text style={styles.signinText}>Ya tienes una cuenta?</Text>
        <Link href="/" style={[styles.link, { color: palette.texts.link }]}>
          Inicia Sesión
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  inputGroup: {
    gap: 30,
    marginBottom: 60,
  },
  signin: {
    marginTop: 30,
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
  signinText: {
    fontWeight: "600",
  },
});
