import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { convertFilesToSongs } from '../helpers';
import { FileSelection } from '../models';
import { TrackItemUpload } from '../types';

export const useUploader = () => {
  const [tracks, setTracks] = useState<TrackItemUpload[]>([]);

  const onGetTracks = useCallback(async(files: File[]) => {
    const potentialSongs: FileSelection[] = await Promise.all(convertFilesToSongs(files));
    const uploadedTracks: TrackItemUpload[] = (potentialSongs || []).map(it => {
      return {
        uuid: uuidv4(),
        media: it
      }
    })
    const updatedTracks = [...tracks, ...uploadedTracks]
    setTracks(updatedTracks);
  }, [tracks]);

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