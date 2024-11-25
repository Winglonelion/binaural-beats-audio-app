// src/api/audio.ts

import { APIService } from '@/src/services/api/api.service';
import { AudioResponse } from '@/src/services/audio/audio-response.types';

export const fetchAudioList = async ({
  pageParam,
}: {
  pageParam?: string;
}): Promise<AudioResponse> => {
  const apiService = APIService.getInstance();
  const response = await apiService.get('/audio', {
    params: {
      cursor: pageParam,
    },
  });
  return response?.data;
};
