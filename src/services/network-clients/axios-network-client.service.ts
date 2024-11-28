// src/network/AxiosNetworkClient.ts
import axios, { AxiosInstance } from 'axios';

import { INetworkClient } from './network-client.interface';

export class AxiosNetworkClient implements INetworkClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL });
  }

  async get(url: string, config?: any): Promise<any> {
    return this.axiosInstance.get(url, config);
  }

  async post(url: string, data: any, config?: any): Promise<any> {
    return this.axiosInstance.post(url, data, config);
  }
}
