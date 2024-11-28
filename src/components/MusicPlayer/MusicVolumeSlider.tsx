import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useMusicPlayer } from '@/providers/MusicPlayerProvider';

const { width } = Dimensions.get('window');

const SLIDER_WIDTH = width - 80; // Slider width
const SLIDER_HEIGHT_DEFAULT = 4; // Default slider height
const SLIDER_HEIGHT_ACTIVE = 8; // Active slider height
const ICON_SIZE = 20; // Icon size
const INITIAL_OPACITY = 0.65; // Initial opacity

const MusicVolumeSlider = () => {
  const { updateVolume, volumeValue } = useMusicPlayer();

  const initialVolume = useSharedValue(volumeValue.value);
  const translateX = useSharedValue(volumeValue.value * SLIDER_WIDTH);
  const opacity = useSharedValue(INITIAL_OPACITY);
  const sliderHeight = useSharedValue(SLIDER_HEIGHT_DEFAULT); // Initial slider height

  // Animated styles
  const containerStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value),
  }));

  const sliderStyle = useAnimatedStyle(() => ({
    width: translateX.value,
    height: withTiming(sliderHeight.value), // Animate height for foreground
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    height: withTiming(sliderHeight.value), // Animate height for background
  }));

  // Gesture for handling slider interaction
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      opacity.value = 1; // Increase opacity when interaction begins
      sliderHeight.value = SLIDER_HEIGHT_ACTIVE; // Increase slider height
      initialVolume.value = volumeValue.value;
    })
    .onUpdate((event) => {
      const delta = event.translationX / SLIDER_WIDTH;
      const newVolume = Math.min(Math.max(initialVolume.value + delta, 0), 1);
      translateX.value = newVolume * SLIDER_WIDTH;
      runOnJS(updateVolume)(newVolume); // Update volume in MusicPlayerProvider
    })
    .onEnd(() => {
      opacity.value = 0.65; // Restore opacity
      sliderHeight.value = SLIDER_HEIGHT_DEFAULT; // Restore slider height
    })
    .onTouchesUp(() => {
      // Ensure slider resets if no drag occurs
      opacity.value = 0.65;
      sliderHeight.value = SLIDER_HEIGHT_DEFAULT;
    });

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      {/* Volume down icon */}
      <Ionicons name="volume-low-outline" size={ICON_SIZE} color="#757575" />

      {/* Slider */}
      <GestureDetector gesture={panGesture}>
        <View style={styles.sliderContainer}>
          <Animated.View style={[styles.sliderBackground, backgroundStyle]} />
          <Animated.View style={[styles.sliderForeground, sliderStyle]} />
        </View>
      </GestureDetector>

      {/* Volume up icon */}
      <Ionicons name="volume-high-outline" size={ICON_SIZE} color="#757575" />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', // Center align all items
    justifyContent: 'space-between',
    width: SLIDER_WIDTH + ICON_SIZE * 2 + 20, // Ensure total width is consistent
    marginVertical: 20,
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: SLIDER_HEIGHT_ACTIVE / 2, // Match with the maximum slider height
    marginHorizontal: 10,
  },
  sliderBackground: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: SLIDER_HEIGHT_ACTIVE / 2,
  },
  sliderForeground: {
    position: 'absolute',
    backgroundColor: '#4A90E2',
    borderRadius: SLIDER_HEIGHT_ACTIVE / 2,
  },
});

export default MusicVolumeSlider;
