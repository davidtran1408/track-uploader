import TagReader from 'jsmediatags';
import { FILE_TYPES, UNKNOWN } from '../constants';
import { AlbumCover, FileSelection, Song } from '../models';

export const convertFilesToSongs = (files: File[]) => {
  const promises: Array<any> = [];
  files.forEach(file => {
    promises.push(
      new Promise((resolve, _) => {
        TagReader.read(file, {
          onSuccess: ({ tags }) => {
            const {
              artist,
              title,
              album,
              year,
              genre,
              TPE2,
              TBPM,
              picture,
              TDRC,
            } = tags;
            const cover = picture
              ? new AlbumCover(picture.format, picture.data)
              : undefined;
 
            const song = new Song(
              artist,
              title,
              album,
              year || TDRC?.data,
              cover,
              genre,
              TPE2?.data || '',
              TBPM?.data || 0,
              tags?.TKEY?.data || '',
              [],
            );
            const fileSelection = new FileSelection(file, song);
            resolve(fileSelection);
          },

          onError: _ => {
            const newSong = {
              artist: 'Track artist',
              title: 'Track title',
              album: '',
              year: '',
              albumCover: undefined,
              genre: '',
              albumArtist: '',
              beatsPerMinute: 0,
            };
            const song = new Song(
              newSong.artist,
              newSong.title,
              newSong.album,
              newSong.year,
              newSong.albumCover,
              newSong.genre,
              newSong.albumArtist,
              newSong.beatsPerMinute,
            );
            const fileSelection = new FileSelection(file, song);
            resolve(fileSelection);
          },
        });
      }),
    );
  });

  return promises;
};


export const getFileTypeCategoryName = (type: string) => {
  return FILE_TYPES[type] || UNKNOWN
};