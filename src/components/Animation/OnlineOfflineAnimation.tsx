import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeIn,
  FadeOutUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Rive, { Direction, Fit, LoopMode, RiveRef } from 'rive-react-native';

import useOffline from '@/hooks/utils/use-offline';
import { tilNextFrame } from '@/utils/frame';

const STATE_MACHINE_ONLINE = 'go_online';
const STATE_MACHINE_OFFLINE = 'go_offline';
// type INPUTS = 'Idle' | 'Offline Mode' | 'Online Mode' | 'Entry';

type States = typeof STATE_MACHINE_ONLINE | typeof STATE_MACHINE_OFFLINE;
function OnlineOfflineAnimation() {
  const riveRef = useRef<RiveRef>(null);
  const animated = useSharedValue(0);
  const [riveState, setRiveState] = useState<States>(STATE_MACHINE_ONLINE);

  const isOffline = useOffline();

  const showBanner = useCallback(() => {
    animated.value = withSequence(
      withTiming(WRAPPER_SIZE, { duration: 1000 }), // Expand to full height
      withDelay(3000, withTiming(0, { duration: 1000 })), // Wait 3s, then collapse
    );
  }, [animated]);

  const noticeNetStatus = useCallback(
    async (_isOffline: boolean) => {
      showBanner();
      if (_isOffline) {
        setRiveState(STATE_MACHINE_OFFLINE);
        await tilNextFrame();
        riveRef.current?.play(
          STATE_MACHINE_ONLINE,
          LoopMode.OneShot,
          Direction.Forwards,
          true,
        );
      } else {
        setRiveState(STATE_MACHINE_ONLINE);
        await tilNextFrame();
        riveRef.current?.play(
          STATE_MACHINE_ONLINE,
          LoopMode.Loop,
          Direction.Forwards,
          true,
        );
      }
    },
    [showBanner],
  );

  useEffect(() => {
    noticeNetStatus(isOffline);
  }, [isOffline, noticeNetStatus]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animated.value,
  }));

  const riveWrapperStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animated.value, [0, 100], [0, 1]),
    transform: [
      {
        translateY: interpolate(animated.value, [0, 80], [-100, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <Animated.View style={riveWrapperStyle}>
          <Rive
            artboardName="Artboard"
            resourceName="online_offline"
            ref={riveRef}
            stateMachineName={riveState}
            onStateChanged={(state) => console.log('State changed:', state)}
            onError={(error) => console.error('Error:', error)}
            onLoopEnd={(animationName) =>
              console.log('Loop end:', animationName)
            }
            onPause={(animationName) => console.log('Pause:', animationName)}
            onPlay={(animationName) => console.log('Play:', animationName)}
            onRiveEventReceived={(event) => console.log('Event:', event)}
            onStop={(animationName) => console.log('Stop:', animationName)}
            fit={Fit.Contain}
            autoplay={false}
            style={styles.animation}
          />
        </Animated.View>
      </Animated.View>
      {isOffline && (
        <Animated.View
          style={styles.offlineNotice}
          entering={FadeIn.delay(4000)}
          exiting={FadeOutUp}
        >
          <Text style={styles.offlineText}>You're offline</Text>
          <Ionicons name="cloud-offline-outline" size={12} color={'#BBB'} />
        </Animated.View>
      )}
    </View>
  );
}

const ANIMATION_SIZE = 100;
const WRAPPER_SIZE = ANIMATION_SIZE + 20;

const styles = StyleSheet.create({
  container: {},
  animatedContainer: {
    width: '100%',
    height: ANIMATION_SIZE + 40,
    alignItems: 'center',
    overflow: 'hidden',
  },
  animation: {
    width: ANIMATION_SIZE,
    height: ANIMATION_SIZE,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  offlineNotice: {
    marginTop: 2,
    gap: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  offlineText: {
    fontSize: 12,
    lineHeight: 14,
    color: '#BBB',
    textAlign: 'center',
  },
});

export default OnlineOfflineAnimation;
