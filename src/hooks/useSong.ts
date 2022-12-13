import { useEffect, useMemo, useState } from 'react';
import DefaultTrackAvatar from "../assets/images/logo.png";
import { TrackItemUpload } from '../types';
import getBlobDuration from 'get-blob-duration';

const useSong = (initialTrack: TrackItemUpload) => {
  const [trackDuration, setTrackDuration] = useState<number>(0);
  const trackAvatar = useMemo(() => {
    const song = initialTrack?.media.song;
    if (!song.albumCover) {
      return DefaultTrackAvatar;
    }

    return song.albumCover.dataAsTagSrc || URL.createObjectURL(song.albumCover);
  }, [initialTrack]);

  const trackSong = useMemo(() => {
    return initialTrack?.media.song;
  }, [initialTrack]);

  const trackFile = useMemo(() => {
    return initialTrack?.media.file;
  }, [initialTrack]);

  const trackSize = useMemo(() => {
    const fileSize =  initialTrack?.media?.file.size || 0;
    return (fileSize / 1000000).toFixed(2);
  }, [initialTrack]);

 useEffect(() => {
  async function fetchDuration() {
    const time = await getBlobDuration(window.URL.createObjectURL(initialTrack?.media.file));
    setTrackDuration(time);
  }
  fetchDuration();
 }, [initialTrack?.media.file]);

  return { trackAvatar, trackSong, trackFile, trackDuration, trackSize }
};

export default useSong;