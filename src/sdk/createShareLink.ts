import {
  createShareLinkVo,
} from '../api';
import {
  shareLinkVoToShareLink,
} from '../utils';
import type {
  ClientConfiguration,
  ShareLink,
  FileSystemItem,
  AccessRole,
} from '../types';

export const createShareLink = async (
  clientConfiguration: ClientConfiguration,
  fileSystemItem: FileSystemItem,
  maxUses?: number,
  showPreview?: boolean,
  defaultAccessRole?: AccessRole,
): Promise<ShareLink> => {
  const shareLinkVo = await createShareLinkVo(
    clientConfiguration,
    fileSystemItem.fileSystemId,
    maxUses,
    showPreview,
    defaultAccessRole,
  );
  return shareLinkVoToShareLink(shareLinkVo);
};
