import React, { FC, useEffect } from 'react';
import { SQLiteProvider } from 'expo-sqlite';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import MusicPlayer from '@/components/MusicPlayer/MusicPlayer';

import {
  DATABASE_NAME,
  DownloadedDBProvider,
} from '@/providers/DownloadedDBProvider';
import { DownloadProvider } from '@/providers/DownloadProvider';
import { MusicPlayerProvider } from '@/providers/MusicPlayerProvider';
import { FirebaseAnalyticsAdapter } from '@/services/analytics/adapter/firebase-analytics-adapter';
import analyticsService from '@/services/analytics/analytics.service';

import CommonStyles from '@/styles/common';

const queryClient = new QueryClient();
/**
 * Could be add multiple adapters
 * like Mixpanel, Adobe, Logrocket
 *  */
analyticsService.addAdapter(new FirebaseAnalyticsAdapter());

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  useEffect(() => {
    analyticsService.trackAppStart();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={CommonStyles.flex1}>
        <SQLiteProvider databaseName={DATABASE_NAME}>
          <DownloadedDBProvider>
            <DownloadProvider>
              <MusicPlayerProvider>
                <BottomSheetModalProvider>
                  {children}
                  <MusicPlayer />
                </BottomSheetModalProvider>
              </MusicPlayerProvider>
            </DownloadProvider>
          </DownloadedDBProvider>
        </SQLiteProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default AppProvider;
