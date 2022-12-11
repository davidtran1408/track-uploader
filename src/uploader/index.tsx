import {
  Box,
  InputGroup,
  Text,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import UploadBox from "../components/UploadBox";
import { UploaderInputProps } from "../types";
import { BiSearch } from "react-icons/bi";
import { useCallback, useState } from "react";
import TrackItem from "../components/TrackItem";

export default function Uploader(props: UploaderInputProps) {
  console.log("props", props);
  // TODO: create hooks to store current files and handle logic there
  const [trackFiles, setTrackFile] = useState<File[]>([]);

  const handleSearchTrack = useCallback(
    (e: any) => {
      const title = e.target.value;
      console.log("title", title);

      if (!title) {
        setTrackFile(trackFiles);
      } else {
        const result = trackFiles.filter((it) => it.name === title);
        setTrackFile(result);
      }
    },
    [trackFiles]
  );

  return (
    <Box p={10}>
      <UploadBox />
      <Text pt={5}>
        Now click on the files that say "Needs Prep" and fill in the information
        required for each to be published. Media files will not go into our
        system unless they meet the requirements above.
      </Text>

      <InputGroup marginTop="17px">
        <InputLeftElement
          pointerEvents="none"
          children={<BiSearch color="gray.300" />}
        />
        <Input
          type="text"
          placeholder="Search..."
          onChange={handleSearchTrack}
        />
      </InputGroup>

      <TrackItem />
      <TrackItem />
    </Box>
  );
}
