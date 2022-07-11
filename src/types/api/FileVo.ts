import type { BaseVo } from './BaseVo';

export interface FileVo extends BaseVo {
  // These fields map to those defined in the base library FileVO
  // https://github.com/PermanentOrg/back-end/blob/main/api/core/file/vo/file.vo.php
  fileId: number;
  size: number;
  format: string;
  fileUrl: string;
  downloadUrl: string;
}

export const defaultFileVo: FileVo = {
  fileId: 0,
  size: 0,
  format: '',
  fileUrl: '',
  downloadUrl: '',
  createdDT: '',
  updatedDT: '',
};
