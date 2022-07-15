import type { JSONSchemaType } from 'ajv';
import { ajv } from '../../utils/ajv';
import type { BaseVo } from './BaseVo';

export interface FolderVo extends BaseVo {
  // These fields map to those defined in the base library FolderVO
  // https://github.com/PermanentOrg/back-end/blob/main/api/core/folder/vo/folder.vo.php
  folderId: number;
  displayName: string;
  displayDT: string;
}

export const defaultFolderVo: FolderVo = {
  folderId: 0,
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
    'displayName',
    'displayDT',
    'createdDT',
    'updatedDT',
  ],
};

export const isFolderVo = ajv.compile(folderVoSchema);
