import {
	type ShareLinkVo,
	type ShareLink,
	type AccessRole,
	Status,
	isStatus,
	isAccessRole,
} from "../types";
import { formatTimestampAsUtc } from "./formatTimestampAsUtc";

const shareLinkVoStatusToStatus = (status: string): Status =>
	isStatus(status) ? status : Status.Undefined;

const shareLinkVoAccessRoleToAccessRole = (
	accessRole?: string | null,
): AccessRole | undefined =>
	isAccessRole(accessRole) ? accessRole : undefined;

export const shareLinkVoToShareLink = (shareLinkVo: ShareLinkVo): ShareLink => {
	const createdAt = new Date(formatTimestampAsUtc(shareLinkVo.createdDT));
	const updatedAt = new Date(formatTimestampAsUtc(shareLinkVo.updatedDT));
	const expiresAt =
		shareLinkVo.expiresDT !== undefined && shareLinkVo.expiresDT !== null
			? new Date(formatTimestampAsUtc(shareLinkVo.expiresDT))
			: undefined;
	const status = shareLinkVoStatusToStatus(shareLinkVo.status);
	const defaultAccessRole = shareLinkVoAccessRoleToAccessRole(
		shareLinkVo.defaultAccessRole,
	);
	return {
		id: shareLinkVo.shareby_urlId,
		sharedFileSystemItemId: shareLinkVo.folder_linkId,
		url: shareLinkVo.shareUrl,
		urlToken: shareLinkVo.urlToken,
		byAccountId: shareLinkVo.byAccountId,
		uses: shareLinkVo.uses ?? undefined,
		maxUses: shareLinkVo.maxUses ?? undefined,
		autoApprove:
			shareLinkVo.autoApproveToggle !== undefined &&
			shareLinkVo.autoApproveToggle !== null &&
			shareLinkVo.autoApproveToggle !== 0,
		showPreview:
			shareLinkVo.previewToggle !== undefined &&
			shareLinkVo.previewToggle !== null &&
			shareLinkVo.previewToggle !== 0,
		defaultAccessRole,
		status,
		createdAt,
		updatedAt,
		expiresAt,
	};
};
