import { HttpResponseError } from '../errors';
import { getFetch } from './getFetch';
import type {
  RequestInit,
  Response,
} from 'node-fetch';
import type { ClientConfiguration } from '../types';

const resolveEndpointPathToUrl = (
  clientConfiguration: ClientConfiguration,
  endpointPath: string,
): string => {
  const stelaApiBaseUrl = clientConfiguration.stelaBaseUrl ?? 'https://api.permanent.org/api/v2';
  return `${stelaApiBaseUrl}${endpointPath}`;
};

const generateApiHeaders = (clientConfiguration: ClientConfiguration): Record<string, string> => ({
  Authorization: `Bearer ${clientConfiguration.bearerToken}`,
  'Request-Version': '2',
  'Content-Type': 'application/json',
});

export const makeStelaApiCall = async (
  clientConfiguration: ClientConfiguration,
  endpointPath: string,
  requestParameters?: RequestInit,
): Promise<Response> => {
  const fetch = getFetch(clientConfiguration);
  const headers = {
    ...generateApiHeaders(clientConfiguration),
    ...(requestParameters?.headers),
  };
  const response = await fetch(
    resolveEndpointPathToUrl(
      clientConfiguration,
      endpointPath,
    ),
    {
      ...requestParameters,
      headers,
    },
  );
  if (!response.ok) {
    throw new HttpResponseError(
      response.status,
      await response.text(),
    );
  }
  return response;
};
