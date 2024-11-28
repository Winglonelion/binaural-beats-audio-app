import React, { FC, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { Ionicons } from '@expo/vector-icons';
import Popover from 'react-native-popover-view';

import { AudioFile } from '@/constants/audio.const';
import { useMusicPlayer } from '@/providers/MusicPlayerProvider';

interface AudioItemProps {
  item: AudioFile;
}

const AudioItem: FC<AudioItemProps> = ({ item }) => {
  const { playNew } = useMusicPlayer();
  const { cover_img, thumbhash = '' } = item.metadata;

  const playAudio = useCallback(() => {
    playNew(item);
  }, [item, playNew]);

  return (
    <Pressable onPress={playAudio} style={styles.item}>
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
        <Text
          minimumFontScale={0.75}
          adjustsFontSizeToFit
          ellipsizeMode="tail"
          numberOfLines={2}
          style={styles.title}
        >
          {item.metadata.name}
        </Text>
        <Text
          minimumFontScale={0.6}
          adjustsFontSizeToFit
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.subtitle}
        >
          {item.metadata.author}
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <Popover
          arrowSize={{ height: 3, width: 6 }}
          from={(sourceRef, showPopover) => (
            <Pressable hitSlop={12} onPress={showPopover}>
              <Ionicons
                color={'#BBB'}
                name="ellipsis-horizontal-outline"
                size={12}
              />
            </Pressable>
          )}
        >
          <View style={styles.popoverContent}>
            <View style={styles.popoverRow}>
              <Ionicons name="cloud-download-outline" size={16} color="#555" />
              <Text style={styles.popoverText}>Download</Text>
            </View>
          </View>
        </Popover>

        {/* <View
          style={{
            borderColor: 'red',
            borderWidth: 1,
            elevation: 100,
          }}
          // onPress={onPressOnMenuButton}
        >
          <Ionicons
            color={'#BBB'}
            name="ellipsis-horizontal-outline"
            size={12}
          />
        </View> */}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
  actionsContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    height: '100%',
    gap: 8,
    marginLeft: 24,
  },
  popoverContent: {
    backgroundColor: '#fff',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  popoverText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
  popoverRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});

export default AudioItem;
