import {
  updateShareLinkVo,
} from '../api';
import {
  shareLinkVoToShareLink,
} from '../utils';
import type {
  ClientConfiguration,
  ShareLink,
} from '../types';

export interface UpdateShareLinkParams {
  shareLink: ShareLink;
}

export const updateShareLink = async (
  configuration: ClientConfiguration,
  params: UpdateShareLinkParams,
): Promise<ShareLink> => {
  const shareLinkVo = await updateShareLinkVo(
    configuration,
    params.shareLink.id,
    params.shareLink.maxUses,
    params.shareLink.showPreview,
    params.shareLink.autoApprove,
    params.shareLink.defaultAccessRole,
    params.shareLink.expiresAt?.toISOString(),
  );
  return shareLinkVoToShareLink(shareLinkVo);
};
