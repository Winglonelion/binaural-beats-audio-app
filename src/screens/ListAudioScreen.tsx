import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';

import { FlashList } from '@shopify/flash-list';

import OnlineOfflineAnimation from '@/components/Animation/OnlineOfflineAnimation';

import { AudioFile } from '@/constants/audio.const';
import { useAudioList } from '@/hooks/queries/audio';
import { useMusicPlayer } from '@/providers/MusicPlayerProvider';
import analyticsService from '@/services/analytics/analytics.service';

const ListAudioScreen = () => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useAudioList();

  const audioList = data?.pages.flatMap((page) => page.files) || [];

  const { playNew } = useMusicPlayer();

  const renderItem = ({ item }: { item: AudioFile }) => {
    const { cover_img, thumbhash = '' } = item.metadata;
    return (
      <Pressable
        onPress={() => {
          playNew(item);
        }}
        style={styles.item}
      >
        <Image
          style={styles.coverImage}
          source={
            cover_img ? { uri: cover_img } : require('@assets/images/zen.jpg')
          }
          placeholder={{ thumbhash }}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.contentText}>
          <Text numberOfLines={2} style={styles.title}>
            {item.metadata.name}
          </Text>
          <Text style={styles.subtitle}>{item.metadata.author}</Text>
        </View>
      </Pressable>
    );
  };

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
      <View style={styles.container}>
        <OnlineOfflineAnimation />
        <FlashList
          contentContainerStyle={styles.listContent}
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
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 100,
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
  coverImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    resizeMode: 'cover',
    overflow: 'hidden',
  },
  contentText: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
