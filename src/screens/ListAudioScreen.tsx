import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAudioList } from '@/src/hooks/queries/audio';

const ListAudioScreen = () => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useAudioList();

  const audioList = data?.pages.flatMap((page) => page.files) || [];

  const renderItem = ({ item }: { item: { name: string; size: number } }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>Size: {item.size} bytes</Text>
    </View>
  );

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
