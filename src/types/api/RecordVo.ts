import type { BaseVo } from './BaseVo';

export interface RecordVo extends BaseVo {
  // These fields map to those defined in the base library ArchiveVO
  // https://github.com/PermanentOrg/back-end/blob/main/api/core/record/vo/record.vo.php
  recordId: number;
  type: string;
  status: string;
  displayName: string;
  uploadFileName: string;
  displayDT: string;
}

export const defaultRecordVo: RecordVo = {
  recordId: 0,
  type: '',
  status: '',
  displayName: '',
  uploadFileName: '',
  displayDT: '',
  createdDT: '',
  updatedDT: '',
};
