import type { BaseVo } from './BaseVo';
import type { FolderVo } from './FolderVo';
import type { FolderSizeVo } from './FolderSizeVo';
import type { ItemVo } from './ItemVo';

export interface ArchiveVo extends BaseVo {
  // These fields map to those defined in the base library ArchiveVO
  // https://github.com/PermanentOrg/back-end/blob/main/library/base/vo/base.archive.vo.php
  archiveId: number;
  publicDT: string;
  archiveNbr: number;
  public: boolean;
  view: string;
  viewProperty: string;
  thumbArchiveNbr: string;
  imageRatio: string;
  type: string;
  thumbStatus: string;
  thumbURL200: string;
  thumbURL500: string;
  thumbURL1000: string;
  thumbURL2000: string;
  thumbDT: string;

  // These fields map to those defined in the api ArchiveVO
  // https://github.com/PermanentOrg/back-end/blob/main/api/core/archive/vo/archive.vo.php
  childFolderVOs: FolderVo[];
  folderSizeVOs: FolderSizeVo[];
  accessRole: string;
  fullName: string;
  spaceTotal: number;
  spaceLeft: number;
  fileTotal: number;
  fileLeft: number;
  relationType: string;
  homeCity: string;
  homeState: string;
  homeCountry: string;
  itemVOs: ItemVo[];
  birthDay: string;
  company: string;
  description: string;
}
