import type { JSONSchemaType } from 'ajv';
import { ajv } from '../../utils/ajv';
import type { BaseVo } from './BaseVo';

export interface FileVo extends BaseVo {
  // These fields map to those defined in the base library FileVO
  // https://github.com/PermanentOrg/back-end/blob/main/api/core/file/vo/file.vo.php
  fileId: number;
  size: number;
  format: string;
  md5Checksum: string;
  fileURL: string;
  downloadURL: string;
}

export const defaultFileVo: FileVo = {
  fileId: 0,
  size: 0,
  format: '',
  md5Checksum: '',
  fileURL: '',
  downloadURL: '',
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
    md5Checksum: {
      type: 'string',
    },
    fileURL: {
      type: 'string',
    },
    downloadURL: {
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
    'md5Checksum',
    'fileURL',
    'downloadURL',
    'createdDT',
    'updatedDT',
  ],
};

export const isFileVo = ajv.compile(fileVoSchema);
