import React, { createContext, useContext } from 'react';

import { SharedValue, useSharedValue } from 'react-native-reanimated';

import { AudioFile } from '@/constants/audio.const';
import { useDownloadedDB } from '@/providers/DownloadedDBProvider';
import downloadService from '@/services/download/download.service';
import fileService from '@/services/download/file.service';

// Define the DownloadContextProps interface
export interface DownloadContextProps {
  downloadProgress: SharedValue<{ [key: string]: number }>; // Shared value for download progress
  startDownload: (id: string, url: string, audio: AudioFile) => void; // Start a new download
  cancelDownload: (id: string) => void; // Cancel a specific download
  cancelAllDownloads: () => void; // Cancel all ongoing downloads
  getProgressById: (id: string) => number; // Retrieve progress for a specific download
}

const DownloadContext = createContext<DownloadContextProps | null>(null);

export const DownloadProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Initialize shared value to store progress for multiple downloads
  const downloadProgress = useSharedValue<{ [key: string]: number }>({});
  const { addDownloadedAudio } = useDownloadedDB();

  // Start downloading a file
  const startDownload = (id: string, url: string, audio: AudioFile) => {
    downloadService.startDownload(
      { id, url, fileName: audio.name },
      async (progress) => {
        // If the download is complete, add the file to the SQLite database
        if (progress === 100) {
          const fileInfo = await fileService.getFileInfo(audio.name);
          fileInfo.exists && addDownloadedAudio(audio, fileInfo.uri);
        }

        // Update the progress of the file in the shared value
        downloadProgress.value = {
          ...downloadProgress.value,
          [id]: progress,
        };
      },
    );
  };

  // Cancel a specific download
  const cancelDownload = (id: string) => {
    downloadService.cancelDownload(id);
    // Remove the progress entry for the canceled download
    const updatedProgress = { ...downloadProgress.value };
    delete updatedProgress[id];
    downloadProgress.value = updatedProgress;
  };

  // Cancel all downloads
  const cancelAllDownloads = () => {
    downloadService.cancelAllDownloads();
    // Reset shared value to an empty object
    downloadProgress.value = {};
  };

  // Get progress for a specific file by ID
  const getProgressById = (id: string) => {
    return downloadProgress.value[id] || 0; // Default to 0 if no progress is found
  };

  return (
    <DownloadContext.Provider
      value={{
        downloadProgress,
        startDownload,
        cancelDownload,
        cancelAllDownloads,
        getProgressById,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
};

export const useDownload = (): DownloadContextProps => {
  const context = useContext(DownloadContext);
  if (!context) {
    throw new Error('useDownload must be used within a DownloadContext');
  }
  return context;
};
