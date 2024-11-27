export interface AudioFile {
  name: string;
  size: number;
  last_modified: string;
}

export interface AudioResponse {
  files: AudioFile[];
  next_cursor: string;
}
