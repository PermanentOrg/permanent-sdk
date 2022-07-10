import type { BaseVo } from './BaseVo';

export interface ArchiveVo extends BaseVo {
  // These fields map to those defined in the base library ArchiveVO
  // https://github.com/PermanentOrg/back-end/blob/main/library/base/vo/base.archive.vo.php
  archiveId: number;
  fullName: string;
}

export const defaultArchiveVo: ArchiveVo = {
  archiveId: 0,
  fullName: '',
  createdDT: '',
  updatedDT: '',
};
