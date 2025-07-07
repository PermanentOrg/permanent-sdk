import { URLSearchParams } from "node:url";
import { makePermanentApiCall } from "../utils";
import type { ClientConfiguration } from "../types";

export const deleteFolderVo = async (
	clientConfiguration: ClientConfiguration,
	folderId: number,
): Promise<void> => {
	const queryParams = new URLSearchParams({
		folderId: `${folderId}`,
	});
	await makePermanentApiCall(
		clientConfiguration,
		`/folder/delete?${queryParams.toString()}`,
		{ method: "DELETE" },
	);
};
