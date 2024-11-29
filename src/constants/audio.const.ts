export interface AudioMetadata {
  id: string;
  name: string;
  author: string;
  fft: string;
  cover_img: string;
  thumbhash?: string;
}

export interface AudioFile {
  name: string;
  size: number;
  last_modified: string;
  metadata: AudioMetadata;
  local_uri?: string;
}

export interface AudioResponse {
  files: AudioFile[];
  next_cursor: string;
}
