import { ajv } from '../../utils/ajv';
import {
  fileVoSchema,
} from './FileVo';
import type { JSONSchemaType } from 'ajv';
import type { BaseVo } from './BaseVo';
import type { FileVo } from './FileVo';

export interface RecordVo extends BaseVo {
  // These fields map to those defined in the base library ArchiveVO
  // https://github.com/PermanentOrg/back-end/blob/main/api/core/record/vo/record.vo.php
  recordId: number;
  folder_linkId: number;
  type: string;
  status: string;
  FileVOs?: FileVo[] | null;
  displayName: string;
  uploadFileName: string;
  downloadName: string;
  displayDT: string;
}

export const recordVoSchema: JSONSchemaType<RecordVo> = {
  type: 'object',
  properties: {
    recordId: {
      type: 'integer',
    },
    folder_linkId: {
      type: 'integer',
    },
    type: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
    FileVOs: {
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
    downloadName: {
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
    'folder_linkId',
    'type',
    'status',
    'displayName',
    'uploadFileName',
    'downloadName',
    'displayDT',
    'createdDT',
    'updatedDT',
  ],
};

export const isRecordVo = ajv.compile(recordVoSchema);
