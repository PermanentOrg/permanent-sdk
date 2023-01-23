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

export const getArchiveRootFolderVo = async (
  clientConfiguration: ClientConfiguration,
  archiveId: number,
): Promise<FolderVo> => {
  const queryParams = new URLSearchParams({
    archiveId: `${archiveId}`,
  });
  const response = await makePermanentApiCall(
    clientConfiguration,
    `/folder/getRoot?${queryParams.toString()}`,
    { method: 'GET' },
  );
  const responseText = await response.text();
  return typedJsonParse(responseText, isFolderVo);
};
