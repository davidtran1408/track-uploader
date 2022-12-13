export enum FILE_TYPE {
  AUDIO = "audio/mpeg",
  VIDEO = "video/*",
  IMAGE = "image/*",
  WAV = "audio/wav",
  MP3 = ".mp3",
  IMAGE_PNG = ".png",
  IMAGE_JPEG = ".jpeg",
  IMAGE_JPG = ".jpg",
}

export const VIDEO_TYPE = "video/mp4";
export const AUDIO_TYPE = "audio/mpeg";
export const WAV_TYPE = "audio/wav";

export const MP3_320KBPS = "MP3 320KBPS";
export const MP4 = "MP4";
export const WAV = "wav";
export const UNKNOWN = "Unknown";

export const FILE_TYPES = {
  [AUDIO_TYPE]: MP3_320KBPS,
  [VIDEO_TYPE]: MP4,
  [WAV_TYPE]: WAV,
};

export enum EXPLICIT_TRACK {
  CLEAN = "clean",
  DIRTY = "dirty",
}
