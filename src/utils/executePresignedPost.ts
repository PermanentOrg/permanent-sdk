import FormData from "form-data";
import fetch from "node-fetch";
import type { Readable } from "stream";
import type { Response } from "node-fetch";

export interface PresignedPostRequest {
	url: string;
	bodyFields: Record<string, unknown>;
	fileData: Buffer | Readable;
	fileSize: number;
}

export const executePresignedPost = async (
	request: PresignedPostRequest,
): Promise<Response> => {
	const formData = new FormData();
	Object.keys(request.bodyFields).forEach((key) => {
		formData.append(key, request.bodyFields[key]);
	});
	formData.append("file", request.fileData, { knownLength: request.fileSize });
	return await fetch(request.url, {
		method: "POST",
		body: formData,
	});
};
