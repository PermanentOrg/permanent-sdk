import { getFolderVo } from '../api';
import { folderVoToFolder } from '../utils';
import type {
  Folder,
  ClientConfiguration,
} from '../types';

export const getFolder = async (
  clientConfiguration: ClientConfiguration,
  folderId: number,
  archiveId: number,
): Promise<Folder> => folderVoToFolder(
  await getFolderVo(
    clientConfiguration,
    folderId,
    archiveId,
  ),
);
