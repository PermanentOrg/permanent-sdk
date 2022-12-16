import type { Status } from './Status';
import type { RecordType } from './RecordType';
import type { File } from './File';

export interface Record {
  id: number;
  displayDate: Date;
  type: RecordType;
  displayName: string;
  files: File[];
  readonly fileSystemCompatibleName: string;
  readonly status: Status;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
