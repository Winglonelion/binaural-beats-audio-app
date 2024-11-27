// src/api/audio.ts

import { AudioResponse } from '@/constants/audio.const';
import { APIService } from '@/services/api/api.service';

export const fetchAudioList = async ({
  pageParam,
}: {
  pageParam?: string;
}): Promise<AudioResponse> => {
  const apiService = APIService.getInstance();
  const params = pageParam ? { cursor: pageParam } : {};
  const response = await apiService.get('/audio', {
    params,
  });
  console.log('🚀 ~ response:', response);
  return response?.data;
};
