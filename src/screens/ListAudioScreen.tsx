import { View, Text } from 'react-native';
import React from 'react';
import { useAudioList } from '@/src/hooks/queries/audio';

const ListAudioScreen = () => {
  const { data } = useAudioList();
  return (
    <View>
      <Text>ListAudio.screen</Text>
    </View>
  );
};

export default ListAudioScreen;
