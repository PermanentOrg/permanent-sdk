import fetch from 'node-fetch';
import type {
  RequestInit,
  Response,
} from 'node-fetch';

function resolveEndpointPathToUrl(endpointPath: string): string {
  // This should be driven by something... env var? idk.
  const apiBaseUrl = 'https://local.permanent.org';
  return `${apiBaseUrl}${endpointPath}`;
}

export const makePermanentApiCall = async (
  authToken: string,
  endpointPath: string,
  requestParameters?: RequestInit,
): Promise<Response> => {
  const headers = {
    'Authorization': `Bearer ${authToken}`,
    // 'Request-Version': '2',
    // 'Accept-Version': '2',
    'Content-Type': 'application/json',
    ...(requestParameters?.headers),
  }
  const response = await fetch(
    resolveEndpointPathToUrl(endpointPath),
    {
      ...requestParameters,
      headers,
    },
  )
  return response;
};
