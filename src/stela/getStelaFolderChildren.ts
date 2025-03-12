import { URLSearchParams } from 'node:url';
import {
  makeStelaApiCall,
} from '../utils';
import type {
  ClientConfiguration,
  PaginatedItems,
  StelaFolder,
  StelaRecord,
} from '../types';

export const getStelaFolderChildren = async (
  clientConfiguration: ClientConfiguration,
  folderId: number,
  cursor: string | null,
  pageSize: number,
): Promise<PaginatedItems<StelaFolder | StelaRecord>> => {
  const queryParams = new URLSearchParams({
    pageSize: `${pageSize}`,
  });
  if (cursor !== null) {
    queryParams.append('cursor', cursor);
  }
  const response = await makeStelaApiCall(
    clientConfiguration,
    `/folder/${folderId}/children?${queryParams.toString()}`,
    { method: 'GET' },
  );
  const responseText = await response.text();
  return JSON.parse(responseText) as PaginatedItems<StelaFolder | StelaRecord>;
};
