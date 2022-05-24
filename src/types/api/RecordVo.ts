export interface RecordVo {
  // These fields map to those defined in the base library ArchiveVO
  // https://github.com/PermanentOrg/back-end/blob/main/api/core/record/vo/record.vo.php
  recordId: number;
  type: string;
  status: string;
  displayName: string;
  uploadFileName: string;
  displayDT: string;
  createdDT: string;
  updatedDT: string;
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
