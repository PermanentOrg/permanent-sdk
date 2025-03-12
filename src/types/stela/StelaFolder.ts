import { ajv } from '../../utils/ajv';
import type { JSONSchemaType } from 'ajv';

export interface StelaFolder {
  folderId: number;
  folderLinkId: number; // This is not documented and is not intended for use outside of the sdk
  displayName: string;
  downloadName: string;
  size?: number | null; // see https://github.com/ajv-validator/ajv/issues/2163
  createdAt: string;
  updatedAt: string;
  displayTimestamp?: string | null; // see https://github.com/ajv-validator/ajv/issues/2163
}

export const stelaFolderSchema: JSONSchemaType<StelaFolder> = {
  type: 'object',
  properties: {
    folderId: {
      type: 'integer',
    },
    folderLinkId: {
      type: 'integer',
    },
    displayName: {
      type: 'string',
    },
    downloadName: {
      type: 'string',
    },
    size: {
      type: 'integer',
      nullable: true,
    },
    createdAt: {
      type: 'string',
    },
    updatedAt: {
      type: 'string',
    },
    displayTimestamp: {
      type: 'string',
      nullable: true,
    },
  },
  required: [
    'folderId',
    'displayName',
    'downloadName',
    'createdAt',
    'updatedAt',
  ],
};

export const isStelaFolder = ajv.compile(stelaFolderSchema);
