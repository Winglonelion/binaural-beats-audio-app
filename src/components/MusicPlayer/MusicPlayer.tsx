import React, { useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Slider from '@react-native-community/slider';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MusicPlayer = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // Snap points for BottomSheet (quick player and full player)
  const snapPoints = useMemo(() => ['10%', '60%', '100%'], []);

  // Handle sheet changes
  const handleSheetChanges = useCallback((index: number) => {
    console.log('Handle sheet changes', index);
  }, []);

  // Open the player
  const openPlayer = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <BottomSheetModalProvider>
      {/* Quick Player Trigger */}
      <TouchableOpacity style={styles.trigger} onPress={openPlayer}>
        <Text style={styles.triggerText}>Play "sample.mp3"</Text>
      </TouchableOpacity>

      {/* Music Player BottomSheet */}
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={styles.sheetBackground}
      >
        {/* Quick Player */}
        <View style={styles.quickPlayer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.albumArt}
          />
          <View style={styles.songInfo}>
            <Text style={styles.songTitle}>Your Design</Text>
            <Text style={styles.artistName}>Grace Mitchell</Text>
          </View>
          <View style={styles.controls}>
            <AntDesign name="pause" size={24} color="black" />
            <AntDesign name="stepforward" size={24} color="black" />
          </View>
        </View>

        {/* Full Player */}
        <View style={styles.fullPlayer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/300' }}
            style={styles.fullAlbumArt}
          />
          <Text style={styles.fullSongTitle}>Your Design</Text>
          <Text style={styles.fullArtistName}>Grace Mitchell</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FF0000"
            maximumTrackTintColor="#000000"
          />
          <View style={styles.fullControls}>
            <AntDesign name="stepbackward" size={24} color="black" />
            <AntDesign name="pausecircle" size={48} color="black" />
            <AntDesign name="stepforward" size={24} color="black" />
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  trigger: {
    marginTop: 50,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  triggerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sheetBackground: {
    backgroundColor: '#f9f9f9',
  },
  quickPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  songInfo: {
    flex: 1,
    marginLeft: 10,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistName: {
    fontSize: 14,
    color: '#888',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 60,
  },
  fullPlayer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  fullAlbumArt: {
    width: width - 40,
    height: width - 40,
    borderRadius: 10,
  },
  fullSongTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  fullArtistName: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  slider: {
    width: width - 40,
    height: 40,
  },
  fullControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width - 40,
    marginTop: 20,
  },
});

export default MusicPlayer;
