import { createShareLinkVo } from "../api";
import { shareLinkVoToShareLink } from "../utils";
import type {
	ClientConfiguration,
	ShareLink,
	FileSystemItem,
	AccessRole,
} from "../types";

export interface CreateShareLinkParams {
	fileSystemItem: FileSystemItem;
	maxUses?: number;
	showPreview?: boolean;
	defaultAccessRole?: AccessRole;
}

export const createShareLink = async (
	clientConfiguration: ClientConfiguration,
	params: CreateShareLinkParams,
): Promise<ShareLink> => {
	const shareLinkVo = await createShareLinkVo(clientConfiguration, {
		folderLinkId: params.fileSystemItem.fileSystemId,
		maxUses: params.maxUses,
		previewToggle: params.showPreview,
		defaultAccessRole: params.defaultAccessRole,
	});
	return shareLinkVoToShareLink(shareLinkVo);
};
