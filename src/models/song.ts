export default class Song {
  constructor(
    public artist = '',
    public title = '',
    public album = '',
    public year = '',
    public albumCover: any,
    public genre = '',
    public albumArtist = '',
    public beatsPerMinute = 0,
    public key = '',
    public tag = [],
    public beatsPerMinuteEnd = beatsPerMinute,
    public sections = null,
    public price = null,
    public releaseOnly = false,
    public isClean = false,
  ) {}
}