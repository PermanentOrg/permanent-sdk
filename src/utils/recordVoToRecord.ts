import type {
  RecordVo,
  Record,
} from '../types';
import { RecordType, Status } from '../types';
import { isRecordType, isStatus } from './generateEnumTypeguard';

const recordTypeToRecordType = (recordType: string): RecordType => (
  isRecordType(recordType) ? recordType : RecordType.Unknown
);

const recordStatusToStatus = (status: string): Status => (
  isStatus(status) ? status : Status.Undefined
);

export const recordVoToRecord = (recordVo: RecordVo): Record => {
  const createdAt = new Date(recordVo.createdDT);
  const updatedAt = new Date(recordVo.updatedDT);
  const displayDate = new Date(recordVo.displayDT);
  const type = recordTypeToRecordType(recordVo.type);
  const status = recordStatusToStatus(recordVo.status);
  return {
    id: recordVo.recordId,
    name: recordVo.displayName,
    type,
    status,
    fileUrl: recordVo.file.fileUrl,
    downloadUrl: recordVo.file.downloadUrl,
    createdAt,
    updatedAt,
    displayDate,
  };
};
