import { Audio } from 'expo-av';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { ENV } from '@/constants/ENV';
import { AudioFile } from '@/constants/audio.const';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

interface MusicPlayerContextProps {
  isPlaying: boolean;
  audio: AudioFile | null;
  positionMillis: SharedValue<number>;
  durationMillis: SharedValue<number>;
  volumeValue: SharedValue<number>;
  playNew: (audio: AudioFile) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  stop: () => Promise<void>;
  seek: (position: number) => Promise<void>;
  updateVolume: (value: number) => Promise<void>;
}

const MusicPlayerContext = createContext<MusicPlayerContextProps | undefined>(
  undefined,
);

export const MusicPlayerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<AudioFile | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const positionMillis = useSharedValue(0); // Shared value for playback position
  const durationMillis = useSharedValue(1); // Avoid division by zero
  const volumeValue = useSharedValue(1); // Shared value for volume

  const unloadAudio = async () => {
    if (soundRef.current) {
      soundRef.current.setOnPlaybackStatusUpdate(null); // Unregister playback listener
      await soundRef.current.unloadAsync();
    }
  };

  const updateVolume = async (value: number) => {
    volumeValue.value = value; // Update shared value
    if (soundRef.current) {
      await soundRef.current.setVolumeAsync(value);
    }
  };

  const playNew = async (_audio: AudioFile) => {
    try {
      if (_audio.name !== audio?.name) {
        if (soundRef.current) {
          await unloadAudio();
        }
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true, // Chạy âm thanh ngay cả khi thiết bị ở chế độ im lặng
        });

        const audioUri = `${ENV.API_URL}/audio/${_audio.name}`;

        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUri },
          { shouldPlay: true, volume: 1, isMuted: false },
        );

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            positionMillis.value = status.positionMillis || 0;
            durationMillis.value = status.durationMillis || 1;
          }

          if (
            status.isLoaded &&
            !status.isBuffering &&
            'didJustFinish' in status &&
            status.didJustFinish
          ) {
            console.log('Playback finished', status);
            setIsPlaying(false);
            positionMillis.value = 0; // Reset position to the beginning
          }
        });

        soundRef.current = sound;
        setAudio(_audio);
        setIsPlaying(true);
      } else {
        await soundRef.current?.playAsync();

        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };
  const replay = async () => {
    try {
      if (positionMillis.value >= durationMillis.value - 1000) {
        await soundRef.current?.setPositionAsync(0);
      }
    } catch (error) {
      console.error('Error resuming audio:', error);
    }
  };

  const togglePlayPause = async () => {
    try {
      if (isPlaying) {
        await soundRef.current?.pauseAsync();
        setIsPlaying(false);
      } else {
        replay();
        await soundRef.current?.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error pausing audio:', error);
    }
  };

  const seek = async (position: number) => {
    try {
      await soundRef.current?.setPositionAsync(position);
      positionMillis.value = position;
    } catch (error) {
      console.error('Error seeking audio:', error);
    }
  };

  const stop = async () => {
    try {
      await soundRef.current?.stopAsync();
      await unloadAudio();
      soundRef.current = null;
      setAudio(null);
      setIsPlaying(false);
      positionMillis.value = 0;
    } catch (error) {
      console.error('Error closing audio:', error);
    }
  };

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      unloadAudio();
    };
  }, []);

  return (
    <MusicPlayerContext.Provider
      value={{
        isPlaying,
        playNew,
        togglePlayPause,
        stop,
        seek,
        audio,
        positionMillis,
        durationMillis,
        volumeValue,
        updateVolume,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = (): MusicPlayerContextProps => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};
