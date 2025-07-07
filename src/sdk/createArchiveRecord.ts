import { createRecordVo } from "../api";
import { recordVoToArchiveRecord } from "../utils";
import type {
	ArchiveRecord,
	File,
	ClientConfiguration,
	Folder,
} from "../types";

export interface CreateArchiveRecordParams {
	s3Url: string;
	file: Pick<Partial<File>, "contentType"> & Pick<File, "size">;
	item: Pick<ArchiveRecord, "displayName" | "fileSystemCompatibleName">;
	parentFolder: Pick<Folder, "id">;
	failOnDuplicateName?: boolean;
}

export const createArchiveRecord = async (
	clientConfiguration: ClientConfiguration,
	params: CreateArchiveRecordParams,
): Promise<ArchiveRecord> => {
	const recordVo = await createRecordVo(clientConfiguration, {
		s3Url: params.s3Url,
		displayName: params.item.displayName,
		parentFolderId: params.parentFolder.id,
		uploadFileName: params.item.fileSystemCompatibleName,
		fileType: params.file.contentType,
		size: params.file.size,
		failOnDuplicateName: params.failOnDuplicateName,
	});
	return recordVoToArchiveRecord(recordVo);
};
