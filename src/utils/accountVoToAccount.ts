import type {
  AccountVo,
  Account,
} from '../types';
import { formatTimestampAsUtc } from './formatTimestampAsUtc';

export const accountVoToAccount = (accountVo: AccountVo): Account => ({
  id: accountVo.accountId,
  isSftpDeletionEnabled: accountVo.allowSftpDeletion,
  createdAt: new Date(formatTimestampAsUtc(accountVo.createdDT)),
  updatedAt: new Date(formatTimestampAsUtc(accountVo.updatedDT)),
});
