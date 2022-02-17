import type { Folder } from './Folder';
import type { Item } from './Item';
import type { Thumbnail } from './Thumbnail';
import type { ArchiveType } from './ArchiveType';
import type { AccessRole } from './AccessRole';
import type { ArchiveStatus } from './ArchiveStatus';

export interface Archive {
  id: number;
  slug: string;
  displayDate: Date;
  type: ArchiveType;
  name: string;
  description: string;
  readonly children: (Folder | Item)[];
  readonly currentAccountAccessRole: AccessRole;
  readonly thumbnails: Thumbnail[];
  readonly containsPublicContent: boolean;
  readonly status: ArchiveStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
