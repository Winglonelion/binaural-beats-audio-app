import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';
import Animated, { FadeIn, FadeOutDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import OnlineOfflineAnimation from '@/components/Animation/OnlineOfflineAnimation';
import AudioItem from '@/components/List/AudioItem';

import { AudioFile } from '@/constants/audio.const';
import { useAudioList } from '@/hooks/queries/audio';
import useOffline from '@/hooks/utils/use-offline';
import { useDownloadedDB } from '@/providers/DownloadedDBProvider';
import analyticsService from '@/services/analytics/analytics.service';

const { height } = Dimensions.get('screen');

const ListAudioScreen = () => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useAudioList();
  const [offlineData, setOfflineData] = useState<AudioFile[]>([]);
  const isOffline = useOffline();

  const { getDownloadedAudios } = useDownloadedDB();

  useEffect(() => {
    if (isOffline) {
      getDownloadedAudios().then((audios) => {
        setOfflineData(audios);
      });
    }
  }, [getDownloadedAudios, isOffline]);

  const audioList = useMemo(
    () => data?.pages.flatMap((page) => page.files) || [],
    [data?.pages],
  );

  const renderItem = useCallback(({ item }: { item: AudioFile }) => {
    return <AudioItem item={item} />;
  }, []);

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const keyExtractor = useCallback((item: AudioFile) => item.name, []);

  useEffect(() => {
    analyticsService.trackScreenView('ListAudioScreen');
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <OnlineOfflineAnimation />
      <FlashList
        contentContainerStyle={styles.listContent}
        data={isOffline ? offlineData : audioList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={100}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Animated.Text
              entering={FadeIn.delay(5000)}
              exiting={FadeOutDown}
              style={styles.emptyText}
            >
              {isOffline
                ? 'Go online and download musics to enjoy while offline'
                : 'Opps! There is no musics available'}
            </Animated.Text>
          </View>
        }
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator size="small" /> : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 16,
  },
  listContent: {
    paddingTop: 24,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBox: {
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#bbb',
  },
});

export default ListAudioScreen;
