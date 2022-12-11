import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import styles from "./index.module.css";

interface NumberInputProps {
  name: string;
  isDisabled?: boolean;
  label?: string;
  required?: boolean;
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (data: any) => void;
}

export default function NumberInput(props: NumberInputProps) {
  const {
    name,
    defaultValue,
    min,
    max,
    required = false,
    label,
    isDisabled = false,
  } = props;

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

      <ChakraNumberInput
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        min={min}
        max={max}
        className={styles.input}
        name={name}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraNumberInput>
    </Box>
  );
}
