import { getFolderVo } from '../api';
import { folderVoToFolder } from '../utils';
import type {
  Folder,
  ClientConfiguration,
} from '../types';

export interface GetFolderParams {
  folderId: number;
  archiveId: number;
}

export const getFolder = async (
  clientConfiguration: ClientConfiguration,
  params: GetFolderParams,
): Promise<Folder> => folderVoToFolder(
  await getFolderVo(
    clientConfiguration,
    params.folderId,
    params.archiveId,
  ),
);
