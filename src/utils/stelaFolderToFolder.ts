import type { StelaFolder, Folder } from "../types";

const DEFAULT_FOLDER_SIZE = 0;

export const stelaFolderToFolder = (stelaFolder: StelaFolder): Folder => ({
	id: stelaFolder.folderId,
	fileSystemId: stelaFolder.folderLinkId,
	name: stelaFolder.displayName,
	fileSystemCompatibleName: stelaFolder.downloadName,
	size: stelaFolder.size ?? DEFAULT_FOLDER_SIZE,
	createdAt: new Date(stelaFolder.createdAt),
	updatedAt: new Date(stelaFolder.updatedAt),
	displayDate:
		stelaFolder.displayTimestamp === null ||
		stelaFolder.displayTimestamp === undefined
			? null
			: new Date(stelaFolder.displayTimestamp),
	folders: [],
	archiveRecords: [],
});
