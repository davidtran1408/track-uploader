import { Box, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FILE_TYPE } from "../../constants";
import styles from "./index.module.css";

interface UploadBoxProps {
  onChange: (files: File[]) => void;
}

export default function UploadBox(props: UploadBoxProps) {
  const { onChange } = props;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    accept: {
      [FILE_TYPE.AUDIO]: [FILE_TYPE.MP3],
    },
    onDrop,
  });

  return (
    <Box
      {...getRootProps({
        className: styles.container,
      })}
    >
      <input {...getInputProps()} />

      <Box width="100%">
        <Text>DROP ZONE</Text>
        <Text fontSize="16px !important">Audio file must be MP3 320kbps</Text>
      </Box>
    </Box>
  );
}
