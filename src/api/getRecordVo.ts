import { URLSearchParams } from 'node:url';
import { isRecordVo } from '../types';
import {
  makePermanentApiCall,
  typedJsonParse,
} from '../utils';
import type {
  ClientConfiguration,
  RecordVo,
} from '../types';

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
  const responseText = await response.text();
  return typedJsonParse(responseText, isRecordVo);
};
