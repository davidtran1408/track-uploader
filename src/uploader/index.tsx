import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import TrackItem from "../components/TrackItem";
import UploadBox from "../components/UploadBox";
import { useUploader } from "../hooks/useUploader";
import { UploaderInputProps } from "../types";

export default function Uploader(props: UploaderInputProps) {
  const { tracks = [], onGetTracks, onRemove } = useUploader();

  return (
    <Box p={10}>
      <UploadBox onChange={onGetTracks} />
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
          // onChange={handleSearchTrack}
        />
      </InputGroup>

      {tracks.map((it) => {
        return <TrackItem key={it.uuid} track={it} onRemove={onRemove} />;
      })}
    </Box>
  );
}
