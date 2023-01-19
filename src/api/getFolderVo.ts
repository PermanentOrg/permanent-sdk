import { URLSearchParams } from 'node:url';
import { ValidationError } from '../errors';
import { isFolderVo } from '../types';
import { makePermanentApiCall } from '../utils';
import type {
  ClientConfiguration,
  FolderVo,
} from '../types';

const parseFolderVo = (value: unknown): FolderVo => {
  if (isFolderVo(value)) {
    return value;
  }
  throw new ValidationError(
    'Invalid server response format',
    isFolderVo.errors,
  );
};

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
  const responseText = await response.json()
  return parseFolderVo(JSON.parse(responseText));
};
