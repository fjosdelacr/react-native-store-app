import {
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { LoginForm } from "../components/LoginForm.component";
import { BackgroundView } from "@/core/components/BackgroundView.component";
import { useThemeContext } from "@/core/contexts/theme.context";
import { useLogin } from "../hooks/useLogin.hook";

export const LoginScreen = () => {
  const { palette } = useThemeContext();
  const { handleLogin, control, errors } = useLogin();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Pressable
        style={{
          flex: 1,
          paddingTop: 150,
          backgroundColor: palette.colors.primary.light,
        }}
        onPress={Keyboard.dismiss}
      >
        <BackgroundView style={{ paddingTop: 50 }}>
          <LoginForm errors={errors} control={control} onSubmit={handleLogin} />
        </BackgroundView>
      </Pressable>
    </KeyboardAvoidingView>
  );
};
