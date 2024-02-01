import type { Status } from './Status';
import type { AccessRole } from './AccessRole';

export interface ShareLink {
  id: number;
  sharedFileSystemItemId: number;
  url: string;
  urlToken: string;
  byAccountId: number;
  uses?: number;
  maxUses?: number;
  autoApprove?: boolean;
  showPreview?: boolean;
  defaultAccessRole?: AccessRole;
  expiresAt?: Date;
  readonly status: Status;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
