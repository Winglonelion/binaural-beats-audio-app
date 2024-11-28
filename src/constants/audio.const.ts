export interface AudioMetadata {
  id: string;
  name: string;
  author: string;
  fft: string;
  cover_img: string;
}

export interface AudioFile {
  name: string;
  size: number;
  last_modified: string;
  metadata: AudioMetadata;
}

export interface AudioResponse {
  files: AudioFile[];
  next_cursor: string;
}
