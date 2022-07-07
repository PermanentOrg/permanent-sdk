import type { BaseVo } from './BaseVo';
import type { FileVo } from './FileVo';
import { defaultFileVo } from './FileVo';

export interface RecordVo extends BaseVo {
  // These fields map to those defined in the base library ArchiveVO
  // https://github.com/PermanentOrg/back-end/blob/main/api/core/record/vo/record.vo.php
  recordId: number;
  type: string;
  status: string;
  file: FileVo;
  displayName: string;
  uploadFileName: string;
  displayDT: string;
}

export const defaultRecordVo: RecordVo = {
  recordId: 0,
  type: '',
  status: '',
  file: defaultFileVo,
  displayName: '',
  uploadFileName: '',
  displayDT: '',
  createdDT: '',
  updatedDT: '',
};
