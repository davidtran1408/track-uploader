import { Box, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { SelectOption } from "../../types";
import styles from "./index.module.css";

interface RadioSelectProps {
  options: SelectOption[];
  required?: boolean;
  label?: string;
  onChange?: (value: any) => void;
}

export default function RadioSelect(props: RadioSelectProps) {
  const { options = [], label, required = false } = props;

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

      <RadioGroup defaultValue="1">
        <Stack spacing={4} direction="row">
          {options.map((op) => (
            <Radio key={op.value} value={op.value}>
              {op.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
}
