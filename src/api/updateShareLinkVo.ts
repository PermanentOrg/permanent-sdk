import {
  makePermanentApiCall,
  typedJsonParse,
} from '../utils';
import {
  type ClientConfiguration,
  type ShareLinkVo,
  isShareLinkVo,
} from '../types';

export interface UpdateShareLinkVoRequest {
  shareByUrlId: number;
  maxUses?: number;
  previewToggle?: boolean;
  autoApproveToggle?: boolean;
  defaultAccessRole?: string;
  expiresDT?: string;
}

export const updateShareLinkVo = async (
  clientConfiguration: ClientConfiguration,
  request: UpdateShareLinkVoRequest,
): Promise<ShareLinkVo> => {
  const body = JSON.stringify(request);
  const response = await makePermanentApiCall(
    clientConfiguration,
    '/share/updateShareLink',
    { method: 'POST', body },
  );

  const responseText = await response.text();
  return typedJsonParse<ShareLinkVo>(responseText, isShareLinkVo);
};
