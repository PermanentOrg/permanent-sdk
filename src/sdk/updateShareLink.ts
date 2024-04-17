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
    {
      shareByUrlId: params.shareLink.id,
      maxUses: params.shareLink.maxUses,
      previewToggle: params.shareLink.showPreview,
      autoApproveToggle: params.shareLink.autoApprove,
      defaultAccessRole: params.shareLink.defaultAccessRole,
      expiresDT: params.shareLink.expiresAt?.toISOString(),
    },
  );
  return shareLinkVoToShareLink(shareLinkVo);
};
