import type { JSONSchemaType } from 'ajv';
import { ajv } from '../utils/ajv';
import { archiveVoSchema } from '../types';
import {
  makePermanentApiCall,
  typedJsonParse,
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

export const getAllArchiveVos = async (
  clientConfiguration: ClientConfiguration,
): Promise<ArchiveVo[]> => {
  const response = await makePermanentApiCall(
    clientConfiguration,
    '/archive/getAllArchives',
    { method: 'GET' },
  );
  const responseText = await response.text();
  return typedJsonParse(responseText, isArchiveVoArray);
};
