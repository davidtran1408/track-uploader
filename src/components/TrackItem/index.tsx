import { Box, Button, ButtonGroup, Image, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import Logo from "../../assets/images/logo.png";
import TrackItemExpand from "../TrackItemExpand";
import styles from "./index.module.css";

export default function TrackItem() {
  const [isExpand, setExpand] = useState(false);

  const handleExpand = useCallback(() => {
    setExpand((pre) => !pre);
  }, []);

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
            src={Logo}
            alt="Track logo"
            className={styles.logo}
          />
          <Text className={styles.title} ml={5}>
            Sizzahandz-Coochie Lips Vs. House Of Los Chicanos (DJ Tool).mp3
          </Text>
        </Box>

        <ButtonGroup
          gap="1"
          display={{ sm: "flex" }}
          justifyContent={{ sm: "end" }}
        >
          <Button size="sm" colorScheme="linkedin" onClick={handleExpand}>
            Need Prep
          </Button>
          <Button size="sm" colorScheme="red" variant="ghost">
            Delete
          </Button>
        </ButtonGroup>
      </Box>

      {isExpand && <TrackItemExpand />}
    </Box>
  );
}
