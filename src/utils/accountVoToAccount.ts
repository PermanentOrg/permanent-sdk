import { formatTimestampAsUtc } from "./formatTimestampAsUtc";
import type { AccountVo, Account } from "../types";

export const accountVoToAccount = (accountVo: AccountVo): Account => ({
	id: accountVo.accountId,
	isSftpDeletionEnabled: accountVo.allowSftpDeletion,
	createdAt: new Date(formatTimestampAsUtc(accountVo.createdDT)),
	updatedAt: new Date(formatTimestampAsUtc(accountVo.updatedDT)),
});
