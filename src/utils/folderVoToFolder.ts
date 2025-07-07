import { isFolderVo, isRecordVo } from "../types";
import { recordVoToArchiveRecord } from "./recordVoToArchiveRecord";
import { formatTimestampAsUtc } from "./formatTimestampAsUtc";
import type { FolderVo, Folder, RecordVo } from "../types";

const extractFolderVos = (items: unknown[]): FolderVo[] =>
	items.filter<FolderVo>((item): item is FolderVo => isFolderVo(item));

const extractRecordVos = (items: unknown[]): RecordVo[] =>
	items.filter<RecordVo>((item): item is RecordVo => isRecordVo(item));

const DEFAULT_FOLDER_SIZE = 0;

export const folderVoToFolder = (folderVo: FolderVo): Folder => ({
	id: folderVo.folderId,
	fileSystemId: folderVo.folder_linkId,
	name: folderVo.displayName,
	fileSystemCompatibleName: folderVo.downloadName,
	size: DEFAULT_FOLDER_SIZE,
	createdAt: new Date(formatTimestampAsUtc(folderVo.createdDT)),
	updatedAt: new Date(formatTimestampAsUtc(folderVo.updatedDT)),
	displayDate:
		folderVo.displayDT === null || folderVo.displayDT === undefined
			? null
			: new Date(formatTimestampAsUtc(folderVo.displayDT)),
	folders: extractFolderVos(folderVo.ChildItemVOs).map(folderVoToFolder),
	archiveRecords: extractRecordVos(folderVo.ChildItemVOs).map(
		recordVoToArchiveRecord,
	),
});
