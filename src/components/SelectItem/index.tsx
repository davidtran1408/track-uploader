import { Box, Text } from "@chakra-ui/layout";
import Select from "react-select";
import { SelectOption } from "../../types";
import styles from "./index.module.css";

interface SelectItemProps {
  isMulti?: boolean;
  isDisabled?: boolean;
  options: SelectOption[];
  label?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: SelectOption;
  onChange?: (data: any) => void;
}

export default function SelectItem(props: SelectItemProps) {
  const {
    isMulti = false,
    isDisabled = false,
    options = [],
    label,
    required = false,
    onChange,
    defaultValue,
    placeholder = "Select option",
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

      <Select
        isMulti={isMulti}
        isDisabled={isDisabled}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        className={styles.selectContainer}
        placeholder={placeholder}
      />
    </Box>
  );
}
