import { useRouter } from "expo-router";
import { loginUseCase } from "../../di/auth.dependencies";
import { UserEntity } from "../../domain/entities/user.entity";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginDefaultValue,
  LoginSchema,
  LoginSchemaType,
} from "../schemas/login.schema";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: LoginDefaultValue,
    resolver: zodResolver(LoginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth"],
    mutationFn: ({ email, password }: LoginSchemaType) =>
      loginUseCase.execute(email, password),
  });

  const onSubmit = (data: LoginSchemaType) => {
    mutate(data, {
      onSuccess: () => {
        router.replace("/products");
      },
      onError: (error) => {
        Alert.alert(error.name, error.message);
      },
    });
  };

  const handleLogin = handleSubmit(onSubmit);

  return {
    errors,
    control,
    isPending,
    handleLogin,
  };
};
