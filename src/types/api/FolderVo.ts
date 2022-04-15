export interface FolderVo {
  // These fields map to those defined in the base library FolderVO
  // https://github.com/PermanentOrg/back-end/blob/main/api/core/folder/vo/folder.vo.php
  folderId: number;
  displayName: string;
  displayDT: string;
  createdDT: string;
  updatedDT: string;
}

export const defaultFolderVo: FolderVo = {
  folderId: 0,
  displayName: '',
  displayDT: '',
  createdDT: '',
  updatedDT: '',
};
