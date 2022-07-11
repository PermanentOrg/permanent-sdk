import type {
  FolderVo,
  Folder,
} from '../types';

export const folderVoToFolder = (folderVo: FolderVo): Folder => {
  const createdAt = new Date(folderVo.createdDT);
  const updatedAt = new Date(folderVo.updatedDT);
  const displayDate = new Date(folderVo.displayDT);
  return {
    id: folderVo.folderId,
    name: folderVo.displayName,
    size: 0,
    createdAt,
    updatedAt,
    displayDate,
    folders: [],
    items: [],
  };
};
