import type {
  Folder,
  ClientConfiguration,
} from '../types';
import { createFolderVo } from '../api';
import { folderVoToFolder } from '../utils';

export const createFolder = async (
  clientConfiguration: ClientConfiguration,
  folder: Pick<Folder, 'name'>,
  parentFolder: Pick<Folder, 'id'>,
): Promise<Folder> => folderVoToFolder(
  await createFolderVo(
    clientConfiguration,
    folder,
    parentFolder,
  ),
);
