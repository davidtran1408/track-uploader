import { useCallback } from 'react';
import { convertFilesToSongs } from '../helpers';

export const useUploaderBox = (files: File[]) => {
  // const handleFilesSelected = useCallback(async files => {
  //   const potentialSongs: any = await convertFilesToSongs(files);
  //   let timeout = 0;
  //   for (const [, potentialSong] of potentialSongs.entries()) {
  //     setTimeout(() => {
  //       potentialSong.then(async result => {
  //         result.dateAdded = new Date().getTime();
  //         if (result.file) {
  //           result._id = result.file.name;
  //           const durationFile = await getBlobDuration(
  //             window.URL.createObjectURL(result.file),
  //           );
  //           const kbit = result.file.size / 128; //calculate bytes to kbit
  //           const kbps = Math.ceil(Math.round(kbit / durationFile) / 16) * 16;

  //           if (result.file.type === VIDEO_TYPE) {
  //             setUploadedFilesVideo(prev => [...prev, result]);
  //           } else {
  //             if (kbps === BITRATE_MP3.KBPS320) {
  //               setUploadedFilesAudio(prev => [...prev, result]);
  //             } else {
  //               console.log(`${result.file.name} must be MP3 320kbps`);
  //             }
  //           }
  //         }
  //       });
  //     }, timeout);
  //     timeout += 100;
  //   }
  // }, []);

  return {}
}