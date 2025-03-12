import { formatTimestampAsUtc } from './formatTimestampAsUtc';
import type {
  StelaFolder,
  Folder,
} from '../types';

export const stelaFolderToFolder = (stelaFolder: StelaFolder): Folder => ({
  id: stelaFolder.folderId,
  fileSystemId: stelaFolder.folderLinkId,
  name: stelaFolder.displayName,
  fileSystemCompatibleName: stelaFolder.downloadName,
  size: stelaFolder.size ?? 0,
  createdAt: new Date(formatTimestampAsUtc(stelaFolder.createdAt)),
  updatedAt: new Date(formatTimestampAsUtc(stelaFolder.updatedAt)),
  displayDate: stelaFolder.displayTimestamp === null || stelaFolder.displayTimestamp === undefined
    ? null
    : new Date(formatTimestampAsUtc(stelaFolder.displayTimestamp)),
  folders: [],
  archiveRecords: [],
});
