import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { AudioFile } from '@/constants/audio.const';
import { useAudioList } from '@/hooks/queries/audio';
import { useMusicPlayer } from '@/providers/MusicPlayerProvider';
import analyticsService from '@/services/analytics/analytics.service';

import CommonStyles from '@/styles/common';

const ListAudioScreen = () => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useAudioList();

  const audioList = data?.pages.flatMap((page) => page.files) || [];

  const { playNew } = useMusicPlayer();

  const renderItem = ({ item }: { item: AudioFile }) => (
    <Pressable
      onPress={() => {
        playNew(item);
      }}
      style={styles.item}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>Size: {item.size} bytes</Text>
    </Pressable>
  );

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

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
    <>
      <View style={CommonStyles.flex1}>
        <FlashList
          data={audioList}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          estimatedItemSize={100}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator size="small" /> : null
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginVertical: 16,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
});

export default ListAudioScreen;
