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
  return parseFolderVo(JSON.parse(responseText));
};
