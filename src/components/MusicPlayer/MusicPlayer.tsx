import React, { useEffect, useMemo, useRef } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import MusicDurationProgress from '@/components/MusicPlayer/MusicDurationProgress';
import MusicFFTVisualizer from '@/components/MusicPlayer/MusicFFTVisualizer';
import MusicProgressSlider from '@/components/MusicPlayer/MusicProgressSlider';
import MusicVolumeSlider from '@/components/MusicPlayer/MusicVolumeSlider';

import { useMusicPlayer } from '@/providers/MusicPlayerProvider';

const { width, height } = Dimensions.get('window');

const MusicPlayer = () => {
  const { togglePlayPause, isPlaying, audio, stop } = useMusicPlayer();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const animatedValue = useSharedValue(0);

  const snapPoints = useMemo(() => [0.15 * height, 0.65 * height, height], []);
  const interpolateRange = useMemo(() => {
    return [
      // height full = height - snap 2 = 0
      0,
      // height - snap 1
      height - snapPoints[1],
      // snap 0
      height - snapPoints[0],
    ];
  }, [snapPoints]);

  // Automatically open BottomSheet when audio starts playing
  useEffect(() => {
    if (isPlaying) {
      bottomSheetRef.current?.present();
    }
  }, [isPlaying]);

  const togglePlayPauseHandler = async () => {
    await togglePlayPause();
  };

  const handleStop = async () => {
    await stop();
    bottomSheetRef.current?.close(); // Close BottomSheet when stopped
  };

  const onDismiss = async () => {
    // Stop audio when BottomSheet is closed
    await stop();
  };

  // Animated styles for Cover Image
  const coverImageStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animatedValue.value,
      interpolateRange,
      [1, 1, 0.3],
    );

    const translateX = interpolate(animatedValue.value, interpolateRange, [
      0,
      0,
      -(width + IMG_SIZE - 32),
    ]);

    const translateY = interpolate(animatedValue.value, interpolateRange, [
      0,
      0,
      -IMG_SIZE,
    ]);

    const marginBottom = interpolate(
      animatedValue.value,
      interpolateRange,
      [80, 80, 0],
    );

    return {
      marginBottom,
      transform: [{ scale }, { translateY }, { translateX }],
    };
  });

  const textContainerStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedValue.value,
      interpolateRange,
      [160, 160, 0],
    );

    const _width = interpolate(animatedValue.value, interpolateRange, [
      width,
      width,
      width * 0.5,
    ]);

    const left = interpolate(animatedValue.value, interpolateRange, [
      0,
      0,
      32 + 30 + 2,
    ]);

    return {
      width: _width,
      left,
      transform: [{ translateY }],
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      animatedValue.value,
      interpolateRange,
      [20, 20, 12],
    );

    return {
      fontSize,
    };
  });

  const artistStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      animatedValue.value,
      interpolateRange,
      [12, 12, 8],
    );

    return {
      fontSize,
    };
  });

  const spaceStyle = useAnimatedStyle(() => {
    const left = interpolate(animatedValue.value, interpolateRange, [8, 8, 0]);

    const marginBottom = interpolate(
      animatedValue.value,
      interpolateRange,
      [4, 4, 0],
    );

    return {
      left,
      marginBottom,
    };
  });

  const playButtonStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animatedValue.value,
      interpolateRange,
      [1, 1, 0.8],
    );

    const translateY = interpolate(animatedValue.value, interpolateRange, [
      0,
      0,
      -(150 + 32),
    ]);

    const translateX = interpolate(animatedValue.value, interpolateRange, [
      0,
      0,
      width / 2 - 32,
    ]);

    return {
      transform: [{ scale }, { translateY }, { translateX }],
    };
  });

  const { cover_img, author, name } = audio?.metadata ?? {};

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      animatedPosition={animatedValue} // Link animatedPosition directly
      enablePanDownToClose={!isPlaying}
      backgroundStyle={styles.sheetBackground}
      onDismiss={onDismiss}
    >
      <BottomSheetView style={styles.contentContainer}>
        {/* Cover Image (Shared Element Transition) */}
        <Animated.View style={[styles.coverContainer, coverImageStyle]}>
          <Image
            source={
              cover_img ? { uri: cover_img } : require('@assets/images/zen.jpg')
            }
            style={styles.coverImage}
          />
        </Animated.View>

        {/* Title and Artist (Shared Element Transition) */}
        <Animated.View style={[styles.textContainer, textContainerStyle]}>
          <Animated.Text
            adjustsFontSizeToFit
            numberOfLines={3}
            ellipsizeMode={'tail'}
            style={[styles.title, titleStyle, spaceStyle]}
          >
            {name || 'Unknown Song'}
          </Animated.Text>
          <Animated.Text
            adjustsFontSizeToFit
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[styles.artist, artistStyle, spaceStyle]}
          >
            {author ?? 'Unknown Artist'}
          </Animated.Text>
        </Animated.View>

        {/* Play and Stop Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={togglePlayPauseHandler}>
            <Animated.View
              sharedTransitionTag="playButton"
              style={[styles.playButton, playButtonStyle]}
            >
              <AntDesign
                name={isPlaying ? 'pause' : 'play'}
                size={24}
                color="white"
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Progress Slider and Duration */}
        <View style={styles.progressContainer}>
          <MusicProgressSlider />
          <MusicDurationProgress />
        </View>

        {/* Volume Slider */}
        <MusicVolumeSlider />
        <MusicFFTVisualizer />

        <View style={styles.closeBtn}>
          <Pressable onPress={handleStop}>
            <AntDesign name="closecircle" size={12} color="#ddd" />
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const IMG_SIZE = 150;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 16,
  },
  sheetBackground: {
    backgroundColor: '#f9f9f9',
  },
  coverContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverImage: {
    width: IMG_SIZE,
    height: IMG_SIZE,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  textContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 12,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export default MusicPlayer;
