import type { Status } from './Status';
import type { AccessRole } from './AccessRole';

export interface ShareLink {
  readonly id: number;
  readonly sharedFileSystemItemId: number;
  readonly url: string;
  readonly urlToken: string;
  readonly byAccountId: number;
  readonly uses?: number;
  maxUses?: number;
  autoApprove?: boolean;
  showPreview?: boolean;
  defaultAccessRole?: AccessRole;
  expiresAt?: Date;
  readonly status: Status;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
