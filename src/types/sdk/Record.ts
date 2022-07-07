import type { Status } from './Status';
import type { RecordType } from './RecordType';

export interface Record {
  id: number;
  displayDate: Date;
  type: RecordType;
  name: string;
  fileUrl: string;
  downloadUrl: string;
  readonly status: Status;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
