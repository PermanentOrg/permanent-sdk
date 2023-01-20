import { ValidationError } from '../errors';
import {
  isFolderVo,
  isFolderVoArray,
  isRecordVo,
  isRecordVoArray,
} from '../types';
import type {
  FolderVo,
  Folder,
  RecordVo,
} from '../types';
import { recordVoToArchiveRecord } from './recordVoToArchiveRecord';
import { formatTimestampAsUtc } from './formatTimestampAsUtc';

const extractFolderVos = (items: unknown[]): FolderVo[] => {
  const folderVos = items.filter((item) => isFolderVo(item));
  if (isFolderVoArray(folderVos)) {
    return folderVos;
  }

  throw new ValidationError(
    'FolderVos were improperly parsed',
    isFolderVoArray.errors,
  );
};

const extractRecordVos = (items: unknown[]): RecordVo[] => {
  const recordVos = items.filter((item) => isRecordVo(item));
  if (isRecordVoArray(recordVos)) {
    return recordVos;
  }

  throw new ValidationError(
    'RecordVos were improperly parsed',
    isRecordVoArray.errors,
  );
};

export const folderVoToFolder = (folderVo: FolderVo): Folder => ({
  id: folderVo.folderId,
  name: folderVo.displayName,
  fileSystemCompatibleName: folderVo.downloadName,
  size: 0,
  createdAt: new Date(formatTimestampAsUtc(folderVo.createdDT)),
  updatedAt: new Date(formatTimestampAsUtc(folderVo.updatedDT)),
  displayDate: new Date(formatTimestampAsUtc(folderVo.displayDT)),
  folders: extractFolderVos(folderVo.ChildItemVOs).map(folderVoToFolder),
  archiveRecords: extractRecordVos(folderVo.ChildItemVOs).map(recordVoToArchiveRecord),
});
