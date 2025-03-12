import { createFolderVo } from '../api';
import { folderVoToFolder } from '../utils';
import type {
  Folder,
  ClientConfiguration,
} from '../types';

export interface CreateFolderParams {
  folder: Pick<Folder, 'name'>;
  parentFolder: Pick<Folder, 'id'>;
  failOnDuplicateName?: boolean;
}

export const createFolder = async (
  clientConfiguration: ClientConfiguration,
  params: CreateFolderParams,
): Promise<Folder> => folderVoToFolder(
  await createFolderVo(
    clientConfiguration,
    params.folder,
    params.parentFolder,
    params.failOnDuplicateName,
  ),
);
