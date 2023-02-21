import type { JSONSchemaType } from 'ajv';
import { ajv } from '../../utils/ajv';
import type { BaseVo } from './BaseVo';

export interface FileVo extends BaseVo {
  // These fields map to those defined in the base library FileVO
  // https://github.com/PermanentOrg/back-end/blob/main/api/core/file/vo/file.vo.php
  fileId: number;
  size: number;
  format: string;
  contentType?: string | null;
  md5Checksum?: string | null;
  fileURL?: string | null;
  downloadURL?: string | null;
}

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
    contentType: {
      type: 'string',
      nullable: true,
    },
    md5Checksum: {
      type: 'string',
      nullable: true,
    },
    fileURL: {
      type: 'string',
      nullable: true,
    },
    downloadURL: {
      type: 'string',
      nullable: true,
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
    'createdDT',
    'updatedDT',
  ],
};

export const isFileVo = ajv.compile(fileVoSchema);
