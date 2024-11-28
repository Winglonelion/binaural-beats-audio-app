import { StyleSheet, Dimensions, View, Text } from 'react-native';

import React, { FC, useState } from 'react';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';
import { useMusicPlayer } from '@/providers/MusicPlayerProvider';
const { width } = Dimensions.get('window');

const MusicDurationProgress: FC = () => {
  const { positionMillis, durationMillis } = useMusicPlayer();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useAnimatedReaction(
    () => positionMillis.value || 0, // Derived value
    (value) => {
      runOnJS(setProgress)(value);
    },
  );

  useAnimatedReaction(
    () => durationMillis.value || 1, // Derived value
    (value) => {
      runOnJS(setDuration)(value);
    },
  );

  return (
    <View style={styles.timeContainer}>
      <Text>{formatTime(progress)}</Text>
      <Text>{formatTime(duration)}</Text>
    </View>
  );
};

const formatTime = (millis: number): string => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 40,
    marginTop: 10,
  },
});

export default MusicDurationProgress;
