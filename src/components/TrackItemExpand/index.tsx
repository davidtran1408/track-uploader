import { Box, Flex, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { EXPLICIT_TRACK } from "../../constants";
import { formatTime } from "../../helpers";
import { getFileTypeCategoryName } from "../../helpers/files";
import useSong from "../../hooks/useSong";
import { SelectOption, TrackItemUpload } from "../../types";
import NumberInput from "../NumberInput";
import SelectItem from "../SelectItem";
import RadioSelect from "../SelectRadio";
import TextInput from "../TextInput";
import TrackSnippet from "../TrackSnippet";
import UploadImageBox from "../UploadImageBox";
import styles from "./index.module.css";

interface TrackItemExpandProps {
  track: TrackItemUpload;
}

export default function TrackItemExpand(props: TrackItemExpandProps) {
  const { track } = props;
  console.log("track", track);
  const { trackAvatar, trackSong, trackFile, trackDuration, trackSize } =
    useSong(track);

  const options = [
    { value: EXPLICIT_TRACK.CLEAN, label: "Clean" },
    { value: EXPLICIT_TRACK.DIRTY, label: "Dirty" },
  ];

  const handleSelectChange = useCallback((item: SelectOption) => {
    console.log("item", item);
  }, []);

  return (
    <Box mb={10} pl={4} pr={4}>
      <Box mb={4}>
        <Flex className={styles.widget}>
          <Text>Track Metadata Information:</Text>
        </Flex>
        <Text>Automatically written by our system:</Text>
        <Flex justifyContent="space-between">
          <Text>
            <b>Key: </b>
            {trackSong?.key || "None"}
          </Text>
          <Text>{getFileTypeCategoryName(trackFile?.type)}</Text>
          <Text>
            <b>Length: </b>
            {formatTime(trackDuration)}
          </Text>
          <Text>
            <b>Size: </b>
            {trackSize}MB
          </Text>
        </Flex>
      </Box>

      <Box mb={4}>
        <Flex className={styles.widget}>
          <Text>* REQUIRED</Text>
        </Flex>

        <Box display={{ base: "block", sm: "flex" }} gridGap="20px">
          <Box width={{ base: "100%", sm: "50%" }}>
            <Text>
              Track Artwork: (If blank, by default your square logo of this
              label will be used)
            </Text>
            <UploadImageBox trackAvatar={trackAvatar} />

            <SelectItem
              name="genre"
              required
              label="Select genre"
              options={[]}
              onChange={handleSelectChange}
            />
            <SelectItem
              name="subGenre"
              required
              label="Select sub genre"
              options={[]}
              onChange={handleSelectChange}
            />
            <NumberInput
              name="tokenCost"
              required
              min={0}
              label="Token Cost:"
            />
          </Box>

          <Box width={{ base: "100%", sm: "50%" }}>
            <RadioSelect
              required
              label="Explicit"
              options={options}
              defaultValue={
                trackSong?.isClean ? EXPLICIT_TRACK.CLEAN : EXPLICIT_TRACK.DIRTY
              }
            />
            <TextInput
              required
              name="trackTitle"
              label="Track title"
              defaultValue={trackFile?.name}
            />
            <TextInput
              required
              name="trackArtist"
              label="Track artist"
              defaultValue={trackSong?.artist}
            />
            <NumberInput
              name="year"
              required
              min={1800}
              max={3999}
              label="Year"
              defaultValue={+trackSong?.year}
            />
            <NumberInput
              name="bpmStart"
              required
              min={50}
              max={220}
              label="BPM Start (50-220)"
              defaultValue={+trackSong.beatsPerMinute}
            />
            <NumberInput
              name="bpmEnd"
              required
              min={50}
              max={220}
              label="BPM End (50-220)"
              defaultValue={+trackSong.beatsPerMinuteEnd}
            />
            <SelectItem
              isMulti
              required
              name="tags"
              placeholder="Select tag"
              label="Select Tags (at least one)"
              options={options}
              onChange={handleSelectChange}
            />
          </Box>
        </Box>
      </Box>

      <Box mb={4}>
        <Flex className={styles.widget}>
          <Text>Create a Snippet File:</Text>
        </Flex>
        <Text>
          Use the track editor to create a snippet file that highlights the part
          of your track you want to be played when people click "play". Snippets
          can be either 30, 60, 90 seconds, or a full-length lower quality
          snippet will be used for "Entire Track".
        </Text>
        <TrackSnippet />
      </Box>

      <Box mb={4}>
        <Text as="b">
          CLAIM SAMPLES: The versions do not matter, we need the Artist and
          Title EXACTLY how it's listed on the originals for each original used
          to make this media file.
        </Text>
        <Text className={styles.subTxt}>
          (Do this part correctly to spare yourself any copyright infringement
          grief. Add the original work to each of the search engines)
        </Text>
        <Text mt={2}>
          Original Work: (Search for the original work on Youtube, Spotify by
          typing the original title into each of the search boxes. IF you are
          uploading a DJ Mix be sure to name all the titles in the mix)
        </Text>
      </Box>
    </Box>
  );
}
