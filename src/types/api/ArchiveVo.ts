import type { JSONSchemaType } from 'ajv';
import { ajv } from '../../utils/ajv';
import type { BaseVo } from './BaseVo';

export interface ArchiveVo extends BaseVo {
  // These fields map to those defined in the base library ArchiveVO
  // https://github.com/PermanentOrg/back-end/blob/main/library/base/vo/base.archive.vo.php
  archiveId: number;
  fullName: string;
}

export const archiveVoSchema: JSONSchemaType<ArchiveVo> = {
  type: 'object',
  properties: {
    archiveId: {
      type: 'integer',
    },
    fullName: {
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
    'archiveId',
    'fullName',
    'createdDT',
    'updatedDT',
  ],
};

export const isArchiveVo = ajv.compile(archiveVoSchema);
