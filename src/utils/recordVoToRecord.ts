import type {
  RecordVo,
  Record,
} from '../types';
import {
  RecordType,
  Status,
  isRecordType,
  isStatus,
} from '../types';
import { fileVoToFile } from './fileVoToFile';
import { formatTimestampAsUtc } from './formatTimestampAsUtc';

const recordTypeToRecordType = (recordType: string): RecordType => (
  isRecordType(recordType) ? recordType : RecordType.Unknown
);

const recordStatusToStatus = (status: string): Status => (
  isStatus(status) ? status : Status.Undefined
);

export const recordVoToRecord = (recordVo: RecordVo): Record => {
  const createdAt = new Date(formatTimestampAsUtc(recordVo.createdDT));
  const updatedAt = new Date(formatTimestampAsUtc(recordVo.updatedDT));
  const displayDate = new Date(formatTimestampAsUtc(recordVo.displayDT));
  const type = recordTypeToRecordType(recordVo.type);
  const status = recordStatusToStatus(recordVo.status);
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
