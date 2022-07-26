import type { JSONSchemaType } from 'ajv';
import { ajv } from '../../utils/ajv';
import type { BaseVo } from './BaseVo';

export interface FileVo extends BaseVo {
  // These fields map to those defined in the base library FileVO
  // https://github.com/PermanentOrg/back-end/blob/main/api/core/file/vo/file.vo.php
  fileId: number;
  size: number;
  format: string;
  checksum: string;
  fileUrl: string;
  downloadUrl: string;
}

export const defaultFileVo: FileVo = {
  fileId: 0,
  size: 0,
  format: '',
  checksum: '',
  fileUrl: '',
  downloadUrl: '',
  createdDT: '',
  updatedDT: '',
};

export const fileVoSchema: JSONSchemaType<FileVo> = {
  type: 'object',
  properties: {
    fileId: {
      type: 'integer',
    },
    size: {
      type: 'integer',
    },
    format: {
      type: 'string',
    },
    checksum: {
      type: 'string',
    },
    fileUrl: {
      type: 'string',
    },
    downloadUrl: {
      type: 'string',
    },
    createdDT: {
      type: 'string',
    },
    updatedDT: {
      type: 'string',
    },
  },
  required: [
    'fileId',
    'size',
    'format',
    'checksum',
    'fileUrl',
    'downloadUrl',
    'createdDT',
    'updatedDT',
  ],
};

export const isFileVo = ajv.compile(fileVoSchema);
