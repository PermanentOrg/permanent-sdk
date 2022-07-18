import { formatTimestampAsUtc } from './formatTimestampAsUtc';
import type {
  FolderVo,
  Folder,
} from '../types';

export const folderVoToFolder = (folderVo: FolderVo): Folder => ({
  id: folderVo.folderId,
  name: folderVo.displayName,
  size: 0,
  createdAt: new Date(formatTimestampAsUtc(folderVo.createdDT)),
  updatedAt: new Date(formatTimestampAsUtc(folderVo.updatedDT)),
  displayDate: new Date(formatTimestampAsUtc(folderVo.displayDT)),
  folders: [],
  records: [],
});
