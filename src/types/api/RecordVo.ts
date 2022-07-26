import type { JSONSchemaType } from 'ajv';
import { ajv } from '../../utils/ajv';
import type { BaseVo } from './BaseVo';
import type { FileVo } from './FileVo';
import {
  fileVoSchema,
} from './FileVo';

export interface RecordVo extends BaseVo {
  // These fields map to those defined in the base library ArchiveVO
  // https://github.com/PermanentOrg/back-end/blob/main/api/core/record/vo/record.vo.php
  recordId: number;
  type: string;
  status: string;
  fileVos?: FileVo[];
  displayName: string;
  uploadFileName: string;
  displayDT: string;
}

export const defaultRecordVo: RecordVo = {
  recordId: 0,
  type: '',
  status: '',
  fileVos: [],
  displayName: '',
  uploadFileName: '',
  displayDT: '',
  createdDT: '',
  updatedDT: '',
};

export const recordVoSchema: JSONSchemaType<RecordVo> = {
  type: 'object',
  properties: {
    recordId: {
      type: 'integer',
    },
    type: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
    fileVos: {
      type: 'array',
      items: fileVoSchema,
      nullable: true,
    },
    displayName: {
      type: 'string',
    },
    uploadFileName: {
      type: 'string',
    },
    displayDT: {
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
    'recordId',
    'type',
    'status',
    'displayName',
    'uploadFileName',
    'displayDT',
    'createdDT',
    'updatedDT',
  ],
};

export const isRecordVo = ajv.compile(recordVoSchema);

export const recordVoArraySchema: JSONSchemaType<RecordVo[]> = {
  type: 'array',
  items: recordVoSchema,
};

export const isRecordVoArray = ajv.compile(recordVoArraySchema);
