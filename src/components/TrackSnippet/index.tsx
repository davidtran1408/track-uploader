import { Box, Text } from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import RadioSelect from "../SelectRadio";

export default function TrackSnippet() {
  const snippetTime = useMemo(() => {
    return [30, 60, 90];
  }, []);

  const options = useMemo(() => {
    return snippetTime.map((it) => {
      return { value: it, label: `${it} seconds` };
    });
  }, [snippetTime]);

  const [secondsPlay, setSecondsPlay] = useState<number>(0);
  // const [startTime, setStartTime] = useState<number>(0);
  // const [endTime, setEndTime] = useState<number>(0);

  const handleSetSeconds = useCallback((value) => {
    setSecondsPlay(value);
  }, []);

  // const blobToFile = useCallback((theBlob, file) => {
  //   return new File([theBlob], `${file.name}`, {
  //     lastModified: new Date().getTime(),
  //     type: "audio/mpeg",
  //   });
  // }, []);

  // const cutAudioSong = useCallback(async (cutStart, cutEnd, file) => {
  //   const formData = new FormData();
  //   formData.append("startTime", cutStart.toString().split(".")[0]);
  //   formData.append("duration", (cutEnd - cutStart).toFixed(2));
  //   formData.append("file", file);
  //   try {
  //     // const data = await createTrackAudioPreview(formData);
  //     // const buff = Buffer.from(data.blob, "base64");
  //     // const blob = new Blob([buff], { type: "audio/mpeg" });
  //     // return blob;
  //   } catch (error) {
  //     console.log("Something went wrong!");
  //   }
  // }, []);

  return (
    <Box>
      <RadioSelect options={options} onChange={handleSetSeconds} />
      <Text>Current track</Text>
      <AudioPlayer
        blobToPlay="https://cc-production-2022.s3.us-east-1.amazonaws.com/nvptest/snippets/Firebeatz--(Ally-Ahern)----I-Wanna-(Rich-Electro-House-Bootleg)[v9nHh]-b4fd5382-5240-4e18-b4e2-3980a06be7d3.mp3"
        onCut={(start, end) => {
          // setStartTime(start);
          // setEndTime(end);
        }}
        isEdit
        secondsPlay={secondsPlay}
      />
    </Box>
  );
}
