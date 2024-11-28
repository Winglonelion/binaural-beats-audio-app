import React, { FC, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import Slider from '@react-native-community/slider';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';

import { useMusicPlayer } from '@/providers/MusicPlayerProvider';
const { width } = Dimensions.get('window');

const MusicProgressSlider: FC = () => {
  const { positionMillis, durationMillis, seek } = useMusicPlayer();
  const [sliderValue, setSliderValue] = useState(0);

  useAnimatedReaction(
    () => (positionMillis.value / durationMillis.value) * 100 || 0, // Derived value
    (value) => {
      runOnJS(setSliderValue)(value);
    },
  );

  const handleSeek = async (value: number) => {
    const position = Math.floor((value / 100) * durationMillis.value); // Ensure proper calculation
    await seek(position);
  };

  return (
    <Slider
      style={styles.slider}
      minimumValue={0}
      maximumValue={100}
      value={sliderValue}
      minimumTrackTintColor="#FF0000"
      maximumTrackTintColor="#000000"
      onSlidingComplete={handleSeek}
    />
  );
};

const styles = StyleSheet.create({
  slider: {
    width: width - 40,
    height: 40,
  },
});

export default MusicProgressSlider;
