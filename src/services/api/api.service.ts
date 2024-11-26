import { ENV } from '@/src/constants/ENV';
import { AxiosNetworkClient } from '@/src/services/network-clients/axios-network-client.service';
import { INetworkClient } from '@/src/services/network-clients/network-client.interface';

export class APIService {
  private static instance: APIService;
  private client: INetworkClient | null = null;

  private constructor() {}

  static getInstance(): APIService {
    if (!APIService.instance) {
      const apiService = new APIService();
      apiService.useClient(new AxiosNetworkClient(ENV.API_URL));
      APIService.instance = apiService;
    }
    return APIService.instance;
  }

  useClient(client: INetworkClient): void {
    this.client = client;
  }

  async get(url: string, config?: any): Promise<any> {
    if (!this.client) {
      throw new Error(
        'No NetworkClient is configured. Use `APIService.useClient()` first.',
      );
    }
    return this.client.get(url, config);
  }

  async post(url: string, data: any, config?: any): Promise<any> {
    if (!this.client) {
      throw new Error(
        'No NetworkClient is configured. Use `APIService.useClient()` first.',
      );
    }
    return this.client.post(url, data, config);
  }
}
