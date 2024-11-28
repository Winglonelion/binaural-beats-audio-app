import { useEffect, useState } from 'react';

import NetInfo from '@react-native-community/netinfo';

function useOffline() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return isOffline;
}

export default useOffline;
