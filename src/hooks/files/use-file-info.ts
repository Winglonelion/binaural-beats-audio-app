import { useCallback, useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';

import fileService from '@/services/download/file.service';

export function useFileInfo(filePath: string) {
  const [info, setInfo] = useState<FileSystem.FileInfo | undefined>(undefined);
  const checkExist = useCallback(async () => {
    const info = await fileService.getFileInfo(filePath);
    return { exists: info.exists, info };
  }, [filePath]);

  useEffect(() => {
    checkExist().then((result) => {
      setInfo(result.info);
    });
  }, [checkExist]);

  return { info, checkExist };
}
