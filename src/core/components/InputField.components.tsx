import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { useThemeContext } from "../contexts/theme.context";
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";

interface InputFieldProps<T extends FieldValues> extends TextInputProps {
  label?: string;
  control: Control<T>;
  name: FieldPath<T>;
  error?: FieldError;
}

export const InputField = <T extends FieldValues>({
  name,
  label,
  error,
  control,
  ...props
}: InputFieldProps<T>) => {
  const { palette } = useThemeContext();

  const renderInput = () => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            {...props}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            style={[
              styles.input,
              {
                borderColor: palette.colors.border,
                height: props.multiline ? 250 : undefined,
              },
            ]}
          />
        )}
      />
    );
  };

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      {renderInput()}
      {error?.message && (
        <Text style={[styles.error, { color: palette.colors.error }]}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
  },
});
