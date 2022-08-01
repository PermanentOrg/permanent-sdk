import { ajv } from '../../utils/ajv';
import { fileSchema } from './File';
import type { JSONSchemaType } from 'ajv';
import type { Status } from './Status';
import type { RecordType } from './RecordType';
import type { File } from './File';

export interface Record {
  id: number;
  displayDate: Date;
  type: RecordType;
  name: string;
  files: File[];
  readonly status: Status;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export const recordSchema: JSONSchemaType<Record> = {
  type: 'object',
  properties: {
    id : {
      type: 'integer',
    },
    displayDate: {
      type: 'object',
      instanceof: 'Date',
      required: [],
    },
    type: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    files: {
      type: 'array',
      items: fileSchema,
    },
    status: {
      type: 'string',
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
    'displayDate',
    'type',
    'name',
    'files',
    'status',
    'createdAt',
    'updatedAt',
  ],
};

export const isRecord = ajv.compile(recordSchema);
