import * as FileSystem from 'expo-file-system';

interface DownloadItem {
  id: string; // Unique ID for the download item
  url: string; // File URL to download
  fileName: string; // Destination file name
}

class DownloadService {
  private pool: Map<string, FileSystem.DownloadResumable> = new Map(); // Active downloads
  private queue: DownloadItem[] = []; // Waiting queue
  private maxConcurrentDownloads: number;

  constructor(maxConcurrentDownloads = 3) {
    this.maxConcurrentDownloads = maxConcurrentDownloads;
  }

  // Start a download
  public startDownload(
    item: DownloadItem,
    onProgress?: (progress: number) => void,
  ): void {
    if (this.pool.size < this.maxConcurrentDownloads) {
      this.downloadFile(item, onProgress);
    } else {
      console.log(`Adding ${item.id} to the queue.`);
      this.queue.push(item); // Add to queue if pool is full
    }
  }

  // Perform the actual download
  private async downloadFile(
    item: DownloadItem,
    onProgress?: (progress: number) => void,
  ): Promise<void> {
    const destinationPath = `${FileSystem.documentDirectory}${item.fileName}`;

    const downloadResumable = FileSystem.createDownloadResumable(
      item.url,
      destinationPath,
      {},
      (downloadProgress) => {
        const progress =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite;
        if (onProgress) onProgress(progress * 100);
      },
    );

    this.pool.set(item.id, downloadResumable);

    try {
      console.log(`Starting download: ${item.id}`);
      await downloadResumable.downloadAsync();
      console.log(`Download completed: ${item.id}`);
    } catch (error) {
      console.error(`Download failed for ${item.id}:`, error);
    } finally {
      this.pool.delete(item.id);
      this.processQueue();
    }
  }

  // Process the next item in the queue
  private processQueue(): void {
    if (this.queue.length > 0 && this.pool.size < this.maxConcurrentDownloads) {
      const nextItem = this.queue.shift();
      if (nextItem) {
        this.downloadFile(nextItem);
      }
    }
  }

  // Cancel a specific download by ID
  public cancelDownload(id: string): void {
    const downloadResumable = this.pool.get(id);
    if (downloadResumable) {
      downloadResumable.pauseAsync();
      this.pool.delete(id);
      console.log(`Download cancelled: ${id}`);
      this.processQueue(); // Process next item in queue
    } else {
      console.log(`Download with ID ${id} not found.`);
    }
  }

  // Cancel all active downloads
  public cancelAllDownloads(): void {
    for (const [id, downloadResumable] of this.pool) {
      downloadResumable.pauseAsync();
      console.log(`Download cancelled: ${id}`);
    }
    this.pool.clear();
    console.log('All downloads cancelled.');
  }

  public clearDownloads(): void {
    this.cancelAllDownloads();
    this.queue = [];
  }
}

const downloadService = new DownloadService(3);

export default downloadService;
