import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TrackItemUpload } from '../types';

export const useUploader = () => {
  const [tracks, setTracks] = useState<TrackItemUpload[]>([]);

  const onGetTracks = useCallback((files: File[]) => {
    const uploadedTracks = (files || []).map(it => {
      return {
        uuid: uuidv4(),
        file: it
      }
    })
    setTracks(uploadedTracks);
  }, []);

  const onRemove = useCallback((trackUUID: string) => {
    const idx = tracks.findIndex(it => it.uuid === trackUUID);
    if(idx !== -1) {
      const updatedTracks = [...tracks];
      updatedTracks.splice(idx, 1);
      setTracks(updatedTracks)
    }
  }, [tracks]);

  return {
    tracks,
    onGetTracks,
    onRemove
  }
}