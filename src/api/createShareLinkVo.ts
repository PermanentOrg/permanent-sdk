import {
  makePermanentApiCall,
  typedJsonParse,
} from '../utils';
import {
  type ClientConfiguration,
  type ShareLinkVo,
  isShareLinkVo,
} from '../types';

export interface CreateShareLinkVoRequest {
  folderLinkId: number;
  maxUses?: number;
  previewToggle?: boolean;
  defaultAccessRole?: string;
}

export const createShareLinkVo = async (
  clientConfiguration: ClientConfiguration,
  request: CreateShareLinkVoRequest,
): Promise<ShareLinkVo> => {
  const body = JSON.stringify(request);
  const response = await makePermanentApiCall(
    clientConfiguration,
    '/share/generateShareLink',
    { method: 'POST', body },
  );

  const responseText = await response.text();
  return typedJsonParse<ShareLinkVo>(responseText, isShareLinkVo);
};
