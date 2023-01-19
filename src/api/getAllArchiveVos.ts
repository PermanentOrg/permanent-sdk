import type { JSONSchemaType } from 'ajv';
import { ajv } from '../utils/ajv';
import { ValidationError } from '../errors';
import { archiveVoSchema } from '../types';
import {
  makePermanentApiCall,
} from '../utils';
import type {
  ArchiveVo,
  ClientConfiguration,
} from '../types';

const archiveVoArraySchema: JSONSchemaType<ArchiveVo[]> = {
  type: 'array',
  items: archiveVoSchema,
};

const isArchiveVoArray = ajv.compile(archiveVoArraySchema);

const parseArchiveVoArray = (value: unknown): ArchiveVo[] => {
  if (isArchiveVoArray(value)) {
    return value;
  }

  throw new ValidationError(
    'Invalid server response format',
    isArchiveVoArray.errors,
  );
};

export const getAllArchiveVos = async (
  clientConfiguration: ClientConfiguration,
): Promise<ArchiveVo[]> => {
  const response = await makePermanentApiCall(
    clientConfiguration,
    '/archive/getAllArchives',
    { method: 'GET' },
  );
  const responseText = await response.text();
  const archiveVos = parseArchiveVoArray(JSON.parse(responseText));
  return archiveVos;
};
