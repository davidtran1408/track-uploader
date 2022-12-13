import { Box, Button, ButtonGroup, Image, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import useSong from "../../hooks/useSong";
import useVisible from "../../hooks/useVisible";
import { TrackItemUpload } from "../../types";
import TrackItemExpand from "../TrackItemExpand";
import styles from "./index.module.css";

interface TrackItemProps {
  track: TrackItemUpload;
  onRemove?: (uuid: string) => void;
}

export default function TrackItem(props: TrackItemProps) {
  const { track, onRemove } = props;
  const expandTrack = useVisible(false);
  const { trackAvatar } = useSong(track);

  const handleRemove = useCallback(() => {
    if (track && onRemove) {
      onRemove(track.uuid);
    }
  }, [onRemove, track]);

  return (
    <Box>
      <Box
        display={{ md: "flex" }}
        justifyContent="space-between"
        alignItems="center"
        mt={5}
        mb={5}
      >
        <Box
          flexShrink={0}
          display="flex"
          alignItems="center"
          mb={{ sm: "10px" }}
        >
          <Image
            borderRadius="6px"
            objectFit="cover"
            h="60px"
            w="60px"
            src={trackAvatar}
            alt="Track logo"
            className={styles.logo}
          />
          <Text className={styles.title} ml={5}>
            {track?.media?.file.name}
          </Text>
        </Box>

        <ButtonGroup
          gap="1"
          display={{ sm: "flex" }}
          justifyContent={{ sm: "end" }}
        >
          <Button size="sm" colorScheme="linkedin" onClick={expandTrack.toggle}>
            Need Prep
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            variant="ghost"
            onClick={handleRemove}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Box>

      {expandTrack.visible && <TrackItemExpand track={track} />}
    </Box>
  );
}
