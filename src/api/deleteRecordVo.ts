import { URLSearchParams } from 'node:url';
import { makePermanentApiCall } from '../utils';
import type { ClientConfiguration } from '../types';

export const deleteRecordVo = async (
  clientConfiguration: ClientConfiguration,
  recordId: number,
): Promise<boolean> => {
  const queryParams = new URLSearchParams({
    recordId: `${recordId}`,
  });
  const response = await makePermanentApiCall(
    clientConfiguration,
    `/record/delete?${queryParams.toString()}`,
    { method: 'DELETE' },
  );
  if (response.status === 200) {
    return true;
  }
  return false;
};
