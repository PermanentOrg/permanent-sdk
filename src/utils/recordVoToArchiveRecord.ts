import {
  ArchiveRecordType,
  Status,
  isArchiveRecordType,
  isStatus,
} from '../types';
import { fileVoToFile } from './fileVoToFile';
import { formatTimestampAsUtc } from './formatTimestampAsUtc';
import type {
  RecordVo,
  ArchiveRecord,
} from '../types';

const recordVoTypeToArchiveRecordType = (recordType: string): ArchiveRecordType => (
  isArchiveRecordType(recordType) ? recordType : ArchiveRecordType.Unknown
);

const recordVoStatusToStatus = (status: string): Status => (
  isStatus(status) ? status : Status.Undefined
);

export const recordVoToArchiveRecord = (recordVo: RecordVo): ArchiveRecord => {
  const createdAt = new Date(formatTimestampAsUtc(recordVo.createdDT));
  const updatedAt = new Date(formatTimestampAsUtc(recordVo.updatedDT));
  const displayDate = new Date(formatTimestampAsUtc(recordVo.displayDT));
  const type = recordVoTypeToArchiveRecordType(recordVo.type);
  const status = recordVoStatusToStatus(recordVo.status);
  const files = (recordVo.FileVOs ?? []).map((fileVo) => fileVoToFile(fileVo));
  return {
    id: recordVo.recordId,
    displayName: recordVo.displayName,
    fileSystemCompatibleName: recordVo.downloadName,
    type,
    status,
    files,
    createdAt,
    updatedAt,
    displayDate,
  };
};
