import type { Status } from './Status';
import type { ArchiveRecordType } from './ArchiveRecordType';
import type { File } from './File';

export interface ArchiveRecord {
  id: number;
  fileSystemId: number;
  displayDate: Date | null;
  type: ArchiveRecordType;
  displayName: string;
  files: File[];
  readonly fileSystemCompatibleName: string;
  readonly status: Status;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
