import type {
  FolderVo,
  Folder,
} from '../types';

export const folderVoToFolder = (folderVo: FolderVo): Folder => ({
  ...folderVo,
  size: 0,
});
