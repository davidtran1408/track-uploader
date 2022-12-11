export interface UploaderInputProps {
  jwt: string;
  genres: GenreOrTag[];
  tags: GenreOrTag[];
  uploadEndpoint: string;
}

export interface GenreOrTag {
  id: string;
  label: string;
}

export interface UploaderOutput {
  tracks: string[];
}

export interface SelectOption {
  value: string;
  label: string;
}