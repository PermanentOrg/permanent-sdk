import { ajv } from '../../utils/ajv';
import { recordSchema } from './Record';
import type { JSONSchemaType } from 'ajv';
import type { Record } from './Record';

export interface Folder {
  id: number;
  name: string;
  size: number;
  displayDate: Date;
  readonly folders: Folder[];
  readonly records: Record[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export const folderSchema: JSONSchemaType<Folder> = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    name: {
      type: 'string',
    },
    size: {
      type: 'integer',
    },
    displayDate: {
      type: 'object',
      instanceof: 'Date',
      required: [],
    },
    folders: {
      type: 'array',
      items: {
        type: 'object',
        required: [],
        $ref: '#'
      },
    },
    records: {
      type: 'array',
      items: recordSchema,
    },
    createdAt: {
      type: 'object',
      instanceof: 'Date',
      required: [],
    },
    updatedAt: {
      type: 'object',
      instanceof: 'Date',
      required: [],
    },
  },
  required: [
    'id',
    'name',
    'size',
    'displayDate',
    'folders',
    'records',
    'createdAt',
    'updatedAt',
  ],
};

export const isFolder = ajv.compile(folderSchema);
