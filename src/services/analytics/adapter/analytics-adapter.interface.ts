// analytics-adapter.interface.ts
export interface IAnalyticsAdapter {
  logEvent(eventName: string, params?: Record<string, any>): void;
  setUserId(userId: string): void;
  setUserProperties(properties: Record<string, any>): void;
  trackScreenView(screenName: string): void;
  trackAppStart(): void;
}
