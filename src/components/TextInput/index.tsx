import { Box, Input, Text } from "@chakra-ui/react";
import styles from "./index.module.css";
import { ChangeEvent } from "react";

interface TextInputProps {
  name: string;
  label?: string;
  defaultValue?: string;
  required?: boolean;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput(props: TextInputProps) {
  const { name, label, defaultValue, required = false, onChange } = props;

  return (
    <Box className={styles.container}>
      <Text className={styles.label}>
        {required && (
          <Text as="span" className={styles.requiredMark}>
            *
          </Text>
        )}
        {label}
      </Text>
      <Input name={name} defaultValue={defaultValue} onChange={onChange} />
    </Box>
  );
}
