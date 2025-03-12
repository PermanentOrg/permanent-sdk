import {
  makeStelaApiCall,
} from '../utils';
import type {
  ClientConfiguration,
  Items,
  StelaFolder,
} from '../types';

export const getStelaFolder = async (
  clientConfiguration: ClientConfiguration,
  folderId: number,
): Promise<StelaFolder> => {
  const queryParams = new URLSearchParams({
    'folderIds[]': `${folderId}`,
  });
  const response = await makeStelaApiCall(
    clientConfiguration,
    `/folder?${queryParams.toString()}`,
    { method: 'GET' },
  );
  const responseText = await response.text();
  const { items } = JSON.parse(responseText) as Items<StelaFolder>;
  if (items.length === 0) {
    throw new Error('Folder not found');
  }
  return items[0];
};
