export interface ClientConfiguration {
  bearerToken: string;
  baseUrl?: string;
  stelaBaseUrl?: string;
  retryOn?: number[];
}
