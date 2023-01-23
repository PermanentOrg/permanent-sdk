import { URLSearchParams } from 'node:url';
import { isFolderVo } from '../types';
import {
  makePermanentApiCall,
  typedJsonParse,
} from '../utils';
import type {
  ClientConfiguration,
  FolderVo,
} from '../types';

export const getFolderVo = async (
  clientConfiguration: ClientConfiguration,
  folderId: number,
  archiveId: number,
): Promise<FolderVo> => {
  const queryParams = new URLSearchParams({
    folderId: `${folderId}`,
    archiveId: `${archiveId}`,
  });
  const response = await makePermanentApiCall(
    clientConfiguration,
    `/folder/getWithChildren?${queryParams.toString()}`,
    { method: 'GET' },
  );
  const responseText = await response.text();
  return typedJsonParse(responseText, isFolderVo);
};
