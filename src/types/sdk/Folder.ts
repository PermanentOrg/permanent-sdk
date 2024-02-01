import type { ArchiveRecord } from './ArchiveRecord';

export interface Folder {
  id: number;
  fileSystemId: number;
  name: string;
  size: number;
  displayDate?: Date;
  readonly fileSystemCompatibleName: string;
  readonly folders: Folder[];
  readonly archiveRecords: ArchiveRecord[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
