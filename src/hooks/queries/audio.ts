import { fetchAudioList } from '@/src/services/audio/list-audio.service';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useAudioList = () => {
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
  });
};
