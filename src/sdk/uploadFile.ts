import { createS3UploadVo } from "../api";
import { executePresignedPost } from "../utils";
import type { Readable } from "stream";
import type {
	ArchiveRecord,
	File,
	ClientConfiguration,
	Folder,
} from "../types";

export interface UploadFileParams {
	fileData: Buffer | Readable;
	file: Pick<File, "contentType" | "size">;
	item: Pick<ArchiveRecord, "displayName" | "fileSystemCompatibleName">;
	parentFolder: Pick<Folder, "id">;
}

export const uploadFile = async (
	clientConfiguration: ClientConfiguration,
	params: UploadFileParams,
): Promise<string> => {
	const s3UploadVo = await createS3UploadVo(clientConfiguration, {
		displayName: params.item.displayName,
		parentFolderId: params.parentFolder.id,
		uploadFileName: params.item.fileSystemCompatibleName,
		fileType: params.file.contentType,
		size: params.file.size,
	});

	await executePresignedPost({
		url: s3UploadVo.presignedPost.url,
		bodyFields: {
			...s3UploadVo.presignedPost.fields,
			"Content-Type": params.file.contentType,
		},
		fileData: params.fileData,
		fileSize: params.file.size,
	});
	return s3UploadVo.destinationUrl;
};
