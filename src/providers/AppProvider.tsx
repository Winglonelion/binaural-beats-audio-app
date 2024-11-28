import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CommonStyles from '@/styles/common';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer';
import { MusicPlayerProvider } from '@/providers/MusicPlayerProvider';

const queryClient = new QueryClient();

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView
        style={[CommonStyles.flex1, { borderColor: 'blue', borderWidth: 1 }]}
      >
        <MusicPlayerProvider>
          <BottomSheetModalProvider>
            {children}
            <MusicPlayer />
          </BottomSheetModalProvider>
        </MusicPlayerProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default AppProvider;
