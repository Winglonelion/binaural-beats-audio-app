// analytics-factory.service.ts

import { IAnalyticsAdapter } from '@/services/analytics/adapter/analytics-adapter.interface';

export class AnalyticsService {
  private static instance: AnalyticsService;
  private adapters: IAnalyticsAdapter[] = [];

  private constructor() {}

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  addAdapter(adapter: IAnalyticsAdapter): void {
    this.adapters.push(adapter);
  }

  logEvent(eventName: string, params?: Record<string, any>): void {
    this.adapters.forEach((adapter) => adapter.logEvent(eventName, params));
  }

  trackScreenView(screenName: string): void {
    this.adapters.forEach((adapter) => adapter.trackScreenView(screenName));
  }

  trackAppStart(): void {
    this.adapters.forEach((adapter) => adapter.trackAppStart());
  }

  setUserId(userId: string): void {
    this.adapters.forEach((adapter) => adapter.setUserId(userId));
  }

  setUserProperties(properties: Record<string, any>): void {
    this.adapters.forEach((adapter) => adapter.setUserProperties(properties));
  }
}

const analyticsService = AnalyticsService.getInstance();

export default analyticsService;
