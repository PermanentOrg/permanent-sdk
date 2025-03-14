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
  createdAt: new Date(stelaFolder.createdAt),
  updatedAt: new Date(stelaFolder.updatedAt),
  displayDate: stelaFolder.displayTimestamp === null || stelaFolder.displayTimestamp === undefined
    ? null
    : new Date(stelaFolder.displayTimestamp),
  folders: [],
  archiveRecords: [],
});
