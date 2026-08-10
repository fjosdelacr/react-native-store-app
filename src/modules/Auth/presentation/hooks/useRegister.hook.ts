import { useRouter } from "expo-router";
import { registerUseCase } from "../../di/auth.dependencies";
import { useForm } from "react-hook-form";
import {
  RegisterDefaultValue,
  RegisterSchema,
  RegisterSchemaType,
} from "../schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useRegister = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: RegisterDefaultValue,
    resolver: zodResolver(RegisterSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth"],
    mutationFn: ({ email, password }: RegisterSchemaType) =>
      registerUseCase.execute(email, password),
  });

  const onSubmit = (data: RegisterSchemaType) => {
    mutate(data, {
      onSuccess: () => {
        router.replace("/products");
      },
      onError: (error) => {
        Alert.alert(error.name, error.message);
      },
    });
  };

  const handleRegister = handleSubmit(onSubmit);

  return {
    errors,
    control,
    isPending,
    handleRegister,
  };
};
