import { useInfiniteQuery } from '@tanstack/react-query';

import useOffline from '@/hooks/utils/use-offline';
import { fetchAudioList } from '@/services/audio/list-audio.service';

export const useAudioList = () => {
  const isOffline = useOffline();
  return useInfiniteQuery({
    queryKey: ['audioList'],
    queryFn: fetchAudioList,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next_cursor === '') {
        return undefined;
      }
      return lastPage.next_cursor;
    },
    initialPageParam: '',
    gcTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 5,
    retry: 3,
    enabled: !isOffline,
  });
};
