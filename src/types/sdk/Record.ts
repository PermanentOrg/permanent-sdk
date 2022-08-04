import type { Status } from './Status';
import type { RecordType } from './RecordType';
import type { File } from './File';

export interface Record {
  id: number;
  displayDate: Date;
  type: RecordType;
  displayName: string;
  fileName: string;
  files: File[];
  readonly status: Status;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
