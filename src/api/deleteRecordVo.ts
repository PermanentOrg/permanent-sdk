import { URLSearchParams } from 'node:url';
import { makePermanentApiCall } from '../utils';
import type { ClientConfiguration } from '../types';

export const deleteRecordVo = async (
  clientConfiguration: ClientConfiguration,
  recordId: number,
): Promise<void> => {
  const queryParams = new URLSearchParams({
    recordId: `${recordId}`,
  });
  await makePermanentApiCall(
    clientConfiguration,
    `/record/delete?${queryParams.toString()}`,
    { method: 'DELETE' },
  );
};
