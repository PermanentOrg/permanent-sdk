import { ValidationError } from '../errors';
import { isFolderVo } from '../types';
import { makePermanentApiCall } from '../utils';
import type {
  ClientConfiguration,
  FolderVo,
  Folder,
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

export const createFolderVo = async (
  clientConfiguration: ClientConfiguration,
  folder: Pick<Folder, 'name'>,
  parentFolder: Pick<Folder, 'id'>,
): Promise<FolderVo> => {
  const body = JSON.stringify({
    displayName: folder.name,
    parentFolderId: parentFolder.id,
  });
  const response = await makePermanentApiCall(
    clientConfiguration,
    '/folder/post',
    {
      method: 'POST',
      body,
    },
  );
  return parseFolderVo(await response.json());
};
