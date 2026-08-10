import { useState } from "react";
import { useRouter } from "expo-router";
import { registerUseCase } from "../../di/auth.dependencies";
import { UserEntity } from "../../domain/entities/user.entity";
import { useForm } from "react-hook-form";
import {
  RegisterDefaultValue,
  RegisterSchema,
} from "../schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";

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

export const useRegister = () => {
  const router = useRouter();
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: RegisterDefaultValue,
    resolver: zodResolver(RegisterSchema),
  });
  const [dataStates, setDataStates] = useState<DataStates>(DATA_STATES_DEFAULT);

  const userEmail = watch("email");
  const userPassword = watch("password");

  const onSubmit = async () => {
    setDataStates({ ...DATA_STATES_DEFAULT, isLoading: true });
    try {
      const result = await registerUseCase.execute(userEmail, userPassword);
      if (result) {
        setDataStates({ ...DATA_STATES_DEFAULT, data: result });
        router.navigate("/");
      }
    } catch (error) {
      setDataStates({ ...DATA_STATES_DEFAULT, isError: true });
    }
  };

  const handleRegister = handleSubmit(onSubmit);

  return {
    errors,
    control,
    dataStates,
    handleRegister,
  };
};
