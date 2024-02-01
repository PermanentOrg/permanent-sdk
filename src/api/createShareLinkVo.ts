import {
  makePermanentApiCall,
  typedJsonParse,
} from '../utils';
import {
  type ClientConfiguration,
  type ShareLinkVo,
  isShareLinkVo,
} from '../types';

export const createShareLinkVo = async (
  clientConfiguration: ClientConfiguration,
  folderLinkId: number,
  maxUses?: number,
  previewToggle?: boolean,
  defaultAccessRole?: string,
): Promise<ShareLinkVo> => {
  const body = JSON.stringify({
    folderLinkId,
    maxUses,
    previewToggle,
    defaultAccessRole,
  });
  const response = await makePermanentApiCall(
    clientConfiguration,
    '/share/generateShareLink',
    { method: 'POST', body },
  );

  const responseText = await response.text();
  return typedJsonParse<ShareLinkVo>(responseText, isShareLinkVo);
};
