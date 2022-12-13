import { Box, Flex, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { SelectOption } from "../../types";
import NumberInput from "../NumberInput";
import SelectItem from "../SelectItem";
import RadioSelect from "../SelectRadio";
import TextInput from "../TextInput";
import TrackSnippet from "../TrackSnippet";
import UploadImageBox from "../UploadImageBox";
import styles from "./index.module.css";

export default function TrackItemExpand() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
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
            <b>Key: </b>Em
          </Text>
          <Text>MP3 320KBPS</Text>
          <Text>
            <b>Length: </b>02:48
          </Text>
          <Text>
            <b>Size: </b>6.79MB
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
            <UploadImageBox />

            <SelectItem
              name="genre"
              required
              label="Select genre"
              options={options}
              onChange={handleSelectChange}
            />
            <SelectItem
              name="subGenre"
              required
              label="Select sub genre"
              options={options}
              onChange={handleSelectChange}
              defaultValue={options[1]}
            />
            <NumberInput
              name="tokenCost"
              required
              min={0}
              label="Token Cost:"
            />
          </Box>

          <Box width={{ base: "100%", sm: "50%" }}>
            <RadioSelect required label="Explicit" options={options} />
            <TextInput required name="trackTitle" label="Track title" />
            <TextInput required name="trackArtist" label="Track artist" />
            <NumberInput
              name="year"
              required
              min={1800}
              max={3999}
              label="Year"
            />
            <NumberInput
              name="bpmStart"
              required
              min={50}
              max={220}
              label="BPM Start (50-220)"
            />
            <NumberInput
              name="bpmEnd"
              required
              min={50}
              max={220}
              label="BPM End (50-220)"
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
