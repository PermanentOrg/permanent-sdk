import { URLSearchParams } from 'node:url';
import { ValidationError } from '../errors';
import { isRecordVo } from '../types';
import { makePermanentApiCall } from '../utils';
import type {
  ClientConfiguration,
  RecordVo,
} from '../types';

const parseRecordVo = (value: unknown): RecordVo => {
  if (isRecordVo(value)) {
    return value;
  }
  throw new ValidationError(
    'Invalid server response format',
    isRecordVo.errors,
  );
};

export const getRecordVo = async (
  clientConfiguration: ClientConfiguration,
  recordId: number,
  archiveId: number,
): Promise<RecordVo> => {
  const queryParams = new URLSearchParams({
    recordId: `${recordId}`,
    archiveId: `${archiveId}`,
  });
  const response = await makePermanentApiCall(
    clientConfiguration,
    `/record/get?${queryParams.toString()}`,
    { method: 'GET' },
  );
  return parseRecordVo(await response.json());
};
