import { IAnalyticsAdapter } from './analytics-adapter.interface';

/** Mock analytic instance of Firebase */
const analytics = () => ({
  logEvent: (eventName: string, params?: Record<string, any>) => {
    console.log('logEvent', eventName, params);
  },
  setUserId: (userId: string) => {
    console.log('setUserId', userId);
  },
  setUserProperties: (properties: Record<string, any>) => {
    console.log('setUserProperties', properties);
  },
});

export class FirebaseAnalyticsAdapter implements IAnalyticsAdapter {
  logEvent(eventName: string, params?: Record<string, any>): void {
    analytics().logEvent(eventName, params);
  }

  setUserId(userId: string): void {
    analytics().setUserId(userId);
  }

  setUserProperties(properties: Record<string, any>): void {
    analytics().setUserProperties(properties);
  }

  trackScreenView(screenName: string): void {
    console.log('trackScreenView', screenName);
  }

  trackAppStart(): void {
    console.log('trackAppStart');
  }
}
