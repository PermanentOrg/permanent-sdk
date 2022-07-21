import type { JSONSchemaType } from 'ajv';
import { ajv } from '../../utils/ajv';
import { recordVoSchema } from './RecordVo';
import type { BaseVo } from './BaseVo';
import type { RecordVo } from './RecordVo';

export interface FolderVo extends BaseVo {
  // These fields map to those defined in the base library FolderVO
  // https://github.com/PermanentOrg/back-end/blob/main/api/core/folder/vo/folder.vo.php
  folderId: number;
  ChildItemVOs: (FolderVo | RecordVo)[];
  displayName: string;
  displayDT: string;
}

export const defaultFolderVo: FolderVo = {
  folderId: 0,
  ChildItemVOs: [],
  displayName: '',
  displayDT: '',
  createdDT: '',
  updatedDT: '',
};

export const folderVoSchema: JSONSchemaType<FolderVo> = {
  type: 'object',
  properties: {
    folderId: {
      type: 'integer',
    },
    ChildItemVOs: {
      type: 'array',
      items: {
        type: 'object',
        required: [],
        anyOf: [
          { $ref: '#' },
          recordVoSchema,
        ],
      },
    },
    displayName: {
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
    'folderId',
    'ChildItemVOs',
    'displayName',
    'displayDT',
    'createdDT',
    'updatedDT',
  ],
};

export const isFolderVo = ajv.compile(folderVoSchema);

export const folderVoArraySchema: JSONSchemaType<FolderVo[]> = {
  type: 'array',
  items: folderVoSchema,
};

export const isFolderVoArray = ajv.compile(folderVoArraySchema);
