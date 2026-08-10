import { useState } from "react";
import { useRouter } from "expo-router";
import { loginUseCase } from "../../di/auth.dependencies";
import { UserEntity } from "../../domain/entities/user.entity";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginDefaultValue, LoginSchema } from "../schemas/login.schema";

const DATA_STATES_DEFAULT = {
  isLoading: false,
  isError: false,
  data: null,
};

interface DataStates {
  isLoading: boolean;
  isError: boolean;
  data: UserEntity | null;
}

export const useLogin = () => {
  const router = useRouter();
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: LoginDefaultValue,
    resolver: zodResolver(LoginSchema)
  })

  const userEmail = watch('email');
  const userPassword = watch('password')

  const [dataStates, setDataStates] = useState<DataStates>(DATA_STATES_DEFAULT);

  const onSubmit = async () => {
    setDataStates({ ...DATA_STATES_DEFAULT, isLoading: true });
    try {
      const result = await loginUseCase.execute(userEmail, userPassword);
      if (result) {
        setDataStates({ ...DATA_STATES_DEFAULT, data: result });
        router.replace("/products");
      }
    } catch (error: any) {
      Alert.alert("Error", error?.message ?? "Error al iniciar sesión");
      setDataStates({ ...DATA_STATES_DEFAULT, isError: true });
    }
  };

  const handleLogin = handleSubmit(onSubmit)

  return {
    errors,
    control,
    dataStates,
    handleLogin,
  };
};
