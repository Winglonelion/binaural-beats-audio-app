import * as FileSystem from 'expo-file-system';

export class FileService {
  constructor(private basePath: string = '') {}

  public async getFileInfo(audioName: string): Promise<FileSystem.FileInfo> {
    const fullPath = FileSystem.documentDirectory + this.basePath + audioName;
    return FileSystem.getInfoAsync(fullPath);
  }

  public async isFileExists(filePath: string): Promise<boolean> {
    const fileInfo = await this.getFileInfo(filePath);
    return fileInfo.exists;
  }
}

const fileService = new FileService();

export default fileService;
