export interface FolderVo {
  // These fields map to those defined in the base library ArchiveVO
  // https://github.com/PermanentOrg/back-end/blob/main/api/core/folder/vo/folder.vo.php
  folderId: number;
  archiveId: number;
  displayName: string;
  displayDT: string;

}

export const defaultFolderVo: FolderVo = {
  folderId: 0,
  archiveId: 0,
  displayName: '',
  displayDT: '',
};
