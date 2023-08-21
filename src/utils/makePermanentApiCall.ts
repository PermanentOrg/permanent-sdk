import fetch from 'node-fetch';
import { HttpResponseError } from '../errors';
import type {
  RequestInit,
  Response,
} from 'node-fetch';
import type { ClientConfiguration } from '../types';

const resolveEndpointPathToUrl = (
  clientConfiguration: ClientConfiguration,
  endpointPath: string,
): string => {
  const apiBaseUrl = clientConfiguration.baseUrl ?? 'https://permanent.org/api';
  return `${apiBaseUrl}${endpointPath}`;
};

const generateApiHeaders = (clientConfiguration: ClientConfiguration): Record<string, string> => ({
  Authorization: `Bearer ${clientConfiguration.bearerToken}`,
  'Request-Version': '2',
  'Content-Type': 'application/json',
});

export const makePermanentApiCall = async (
  clientConfiguration: ClientConfiguration,
  endpointPath: string,
  requestParameters?: RequestInit,
): Promise<Response> => {
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
