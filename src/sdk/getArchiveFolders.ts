import { getArchiveRootFolderVo } from '../api';
import { folderVoToFolder } from '../utils';
import type {
  ClientConfiguration,
  Folder,
} from '../types';

export interface GetArchiveFoldersParams {
  archiveId: number;
}

export const getArchiveFolders = async (
  clientConfiguration: ClientConfiguration,
  params: GetArchiveFoldersParams,
): Promise<Folder[]> => {
  const rootFolderVo = await getArchiveRootFolderVo(
    clientConfiguration,
    params.archiveId,
  );
  const rootFolder = folderVoToFolder(rootFolderVo);
  return rootFolder.folders;
};
