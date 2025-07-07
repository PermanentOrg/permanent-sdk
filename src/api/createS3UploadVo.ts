import { isS3UploadVo } from "../types";
import { makePermanentApiCall, typedJsonParse } from "../utils";
import type { ClientConfiguration, S3UploadVo } from "../types";

export interface CreateS3UploadVoRequest {
	displayName: string;
	parentFolderId: number;
	uploadFileName: string;
	fileType: string;
	size: number;
}

export const createS3UploadVo = async (
	clientConfiguration: ClientConfiguration,
	request: CreateS3UploadVoRequest,
): Promise<S3UploadVo> => {
	const body = JSON.stringify(request);
	const response = await makePermanentApiCall(
		clientConfiguration,
		"/record/getPresignedUrl",
		{
			method: "POST",
			body,
		},
	);
	const responseText = await response.text();
	return typedJsonParse(responseText, isS3UploadVo);
};
