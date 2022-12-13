import { Box, Image, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosCloseCircle } from "react-icons/io";
import { FILE_TYPE } from "../../constants";
import styles from "./index.module.css";

interface UploadImageBoxProps {
  trackAvatar?: string;
}

export default function UploadImageBox(props: UploadImageBoxProps) {
  const { trackAvatar } = props;
  const [selectedFile, setSelectedFile] = useState<any>(trackAvatar || null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const fileObj = URL.createObjectURL(acceptedFiles[0]);
    setSelectedFile(fileObj);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      [FILE_TYPE.IMAGE]: [
        FILE_TYPE.IMAGE_PNG,
        FILE_TYPE.IMAGE_JPEG,
        FILE_TYPE.IMAGE_JPG,
      ],
    },
    onDrop,
  });

  const removePreview = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const renderPreviewImg = () => {
    return (
      <Box className={styles.previewWidget}>
        <Image
          src={selectedFile}
          alt="Track avatar"
          onLoad={() => {
            URL.revokeObjectURL(selectedFile);
          }}
          width="250px"
          height="250px"
        />
        <IoIosCloseCircle
          cursor="pointer"
          className={styles.removeIcon}
          onClick={removePreview}
        />
      </Box>
    );
  };

  const renderDropzoneBox = () => {
    return (
      <Box
        {...getRootProps({
          className: styles.container,
        })}
      >
        <input {...getInputProps()} />
        <Box width="100%">
          <Text>Drop image</Text>
        </Box>
      </Box>
    );
  };

  return selectedFile ? renderPreviewImg() : renderDropzoneBox();
}
