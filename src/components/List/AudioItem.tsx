import React, { FC, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { Ionicons } from '@expo/vector-icons';
import throttle from 'lodash.throttle';
import Popover from 'react-native-popover-view';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';

import { AudioFile } from '@/constants/audio.const';
import { ENV } from '@/constants/ENV';
import { useFileInfo } from '@/hooks/files/useFileInfo';
import { useDownload } from '@/providers/DownloadProvider'; // Import DownloadProvider
import { useMusicPlayer } from '@/providers/MusicPlayerProvider';

interface AudioItemProps {
  item: AudioFile;
}

const AudioItem: FC<AudioItemProps> = ({ item }) => {
  const { playNew } = useMusicPlayer();
  const [progress, _setProgress] = React.useState(0);
  const { startDownload, cancelDownload, downloadProgress } = useDownload(); // Download methods
  const { cover_img, thumbhash = '', id } = item.metadata;
  const popRef = React.useRef<Popover>(null);
  const { info } = useFileInfo(item.name);
  const { exists: isFileExist = null } = info ?? {}; // Check if file exists

  const setProgress = useMemo(() => {
    return throttle((prog: number) => {
      _setProgress(prog);
    }, 100);
  }, []);

  const playAudio = useCallback(() => {
    playNew(item);
  }, [item, playNew]);

  useAnimatedReaction(
    () => downloadProgress.value[id] || 0, // Derived value
    (value) => {
      // Update download progress
      runOnJS(setProgress)(value);
    },
  );

  // Handle download button press
  const handleDownload = useCallback(() => {
    popRef.current?.requestClose();

    if (isFileExist === null || isFileExist) return; // Skip if file existence is unknown or already exists

    if (progress > 0 && progress < 100) {
      cancelDownload(id); // Cancel if downloading
    } else {
      const url = `${ENV.API_URL}/download/${item.name}`;
      startDownload(id, url, item); // Start download
    }
  }, [cancelDownload, id, isFileExist, item, progress, startDownload]);

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
          ref={popRef}
          arrowSize={{ height: 3, width: 6 }}
          from={(sourceRef, showPopover) => (
            <Pressable
              style={styles.actionMenu}
              hitSlop={12}
              onPress={showPopover}
            >
              <Ionicons
                color={'#BBB'}
                name="ellipsis-horizontal-outline"
                size={12}
              />
            </Pressable>
          )}
        >
          <View style={styles.popoverContent}>
            <Pressable onPress={handleDownload}>
              <View style={styles.popoverRow}>
                <Ionicons
                  name="cloud-download-outline"
                  size={16}
                  color="#555"
                />
                <Text style={styles.popoverText}>
                  {progress > 0 && progress < 100 ? 'Cancel' : 'Download'}
                </Text>
              </View>
            </Pressable>
          </View>
        </Popover>
        {/* Progress indicator */}
        {(isFileExist || progress === 100) && (
          <Ionicons name="checkmark-circle-outline" size={16} color="#4A90E2" />
        )}
        {!isFileExist && progress > 0 && progress < 100 && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>
        )}
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
  actionMenu: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  actionsContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
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
  progressContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
});

export default AudioItem;
