import type { Record } from './Record';

export interface Folder {
  id: number;
  name: string;
  size: number;
  displayDate: Date;
  readonly fileSystemCompatibleName: string;
  readonly folders: Folder[];
  readonly records: Record[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
