import { ajv } from '../../utils/ajv';
import type { JSONSchemaType } from 'ajv';
import { DerivativeType } from './DerivativeType';

export interface File {
  id: number;
  derivativeType: DerivativeType;
  fileUrl: string;
  downloadUrl: string;
  checksum: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export const fileSchema: JSONSchemaType<File> = {
  type: 'object',
  properties: {
    id : {
      type: 'integer',
    },
    derivativeType: {
      type: 'string',
    },
    fileUrl: {
      type: 'string',
    },
    downloadUrl: {
      type: 'string',
    },
    checksum: {
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
    'derivativeType',
    'fileUrl',
    'downloadUrl',
    'checksum',
    'createdAt',
    'updatedAt',
  ],
};

export const isFile = ajv.compile(fileSchema);
