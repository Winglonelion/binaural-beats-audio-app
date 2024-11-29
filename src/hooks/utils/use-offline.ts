import { useNetworkState } from 'expo-network';

function useOffline() {
  const networkState = useNetworkState();

  return networkState.isInternetReachable !== true;
}

export default useOffline;
