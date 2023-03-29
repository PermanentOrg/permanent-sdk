import { URLSearchParams } from 'node:url';
import { makePermanentApiCall } from '../utils';
import type { ClientConfiguration } from '../types';

export const deleteFolderVo = async (
  clientConfiguration: ClientConfiguration,
  folderId: number,
): Promise<boolean> => {
  const queryParams = new URLSearchParams({
    folderId: `${folderId}`,
  });
  const response = await makePermanentApiCall(
    clientConfiguration,
    `/folder/delete?${queryParams.toString()}`,
    { method: 'DELETE' },
  );
  if (response.status === 200) {
    return true;
  }
  return false;
};
