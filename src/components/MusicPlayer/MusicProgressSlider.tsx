import { StyleSheet, Dimensions } from 'react-native';

import React, { FC, useState } from 'react';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';
import Slider from '@react-native-community/slider';
const { width } = Dimensions.get('window');

interface MusicSliderProps {
  handleSeek: (value: number) => void;
  positionMillis: any;
  durationMillis: any;
}

const MusicProgressSlider: FC<MusicSliderProps> = ({
  handleSeek,
  positionMillis,
  durationMillis,
}) => {
  const [sliderValue, setSliderValue] = useState(0);

  useAnimatedReaction(
    () => (positionMillis.value / durationMillis.value) * 100 || 0, // Derived value
    (value) => {
      runOnJS(setSliderValue)(value);
    },
  );

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
