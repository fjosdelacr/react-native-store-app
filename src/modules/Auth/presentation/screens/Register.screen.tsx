import { BackgroundView } from "@/core/components/BackgroundView.component";
import { useThemeContext } from "@/core/contexts/theme.context";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { RegisterForm } from "../components/RegisterForm.component";
import { useRegister } from "../hooks/useRegister.hook";
import { LoaderScreen } from "@/core/components/LoaderScreen";

export const RegisterScreen = () => {
  const { palette } = useThemeContext();
  const { control, errors, handleRegister, isPending } = useRegister();

  if (isPending) return <LoaderScreen />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: palette.colors.primary.light,
          paddingTop: 150,
        }}
        onPress={Keyboard.dismiss}
      >
        <BackgroundView style={{ paddingTop: 50 }}>
          <RegisterForm
            errors={errors}
            control={control}
            onSubmit={handleRegister}
          />
        </BackgroundView>
      </Pressable>
    </KeyboardAvoidingView>
  );
};
