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

export const updateShareLink = async (
  configuration: ClientConfiguration,
  shareLink: ShareLink,
): Promise<ShareLink> => {
  const shareLinkVo = await updateShareLinkVo(
    configuration,
    shareLink.id,
    shareLink.maxUses,
    shareLink.showPreview,
    shareLink.autoApprove,
    shareLink.defaultAccessRole,
    shareLink.expiresAt?.toISOString(),
  );
  return shareLinkVoToShareLink(shareLinkVo);
};
