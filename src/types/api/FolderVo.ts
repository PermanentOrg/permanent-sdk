import { ajv } from '../../utils/ajv';
import { recordVoSchema } from './RecordVo';
import type { JSONSchemaType } from 'ajv';
import type { BaseVo } from './BaseVo';
import type { RecordVo } from './RecordVo';

export interface FolderVo extends BaseVo {
  // These fields map to those defined in the base library FolderVO
  // https://github.com/PermanentOrg/back-end/blob/main/api/core/folder/vo/folder.vo.php
  folderId: number;
  folder_linkId: number;
  ChildItemVOs: (FolderVo | RecordVo)[];
  displayName: string;
  downloadName: string;
  displayDT?: string | null;
}

export const folderVoSchema: JSONSchemaType<FolderVo> = {
  type: 'object',
  properties: {
    folderId: {
      type: 'integer',
    },
    folder_linkId: {
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
    downloadName: {
      type: 'string',
    },
    displayDT: {
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
    'folderId',
    'folder_linkId',
    'ChildItemVOs',
    'displayName',
    'downloadName',
    'createdDT',
    'updatedDT',
  ],
};

export const isFolderVo = ajv.compile(folderVoSchema);
