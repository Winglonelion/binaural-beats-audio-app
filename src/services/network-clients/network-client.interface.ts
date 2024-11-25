// src/network/NetworkClient.ts
export interface INetworkClient {
  get(url: string, config?: any): Promise<any>;
  post(url: string, data: any, config?: any): Promise<any>;
}
