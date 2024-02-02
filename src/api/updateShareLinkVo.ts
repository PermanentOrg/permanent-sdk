import {
  makePermanentApiCall,
  typedJsonParse,
} from '../utils';
import {
  type ClientConfiguration,
  type ShareLinkVo,
  isShareLinkVo,
} from '../types';

export const updateShareLinkVo = async (
  clientConfiguration: ClientConfiguration,
  shareByUrlId: number,
  maxUses?: number,
  previewToggle?: boolean,
  autoApproveToggle?: boolean,
  defaultAccessRole?: string,
  expiresDT?: string,
): Promise<ShareLinkVo> => {
  const body = JSON.stringify({
    shareByUrlId,
    maxUses,
    previewToggle,
    autoApproveToggle,
    defaultAccessRole,
    expiresDT,
  });
  const response = await makePermanentApiCall(
    clientConfiguration,
    '/share/updateShareLink',
    { method: 'POST', body },
  );

  const responseText = await response.text();
  return typedJsonParse<ShareLinkVo>(responseText, isShareLinkVo);
};
