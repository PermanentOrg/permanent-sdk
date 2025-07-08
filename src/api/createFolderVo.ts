import { isFolderVo } from "../types";
import { makePermanentApiCall, typedJsonParse } from "../utils";
import type { ClientConfiguration, FolderVo, Folder } from "../types";

export const createFolderVo = async (
	clientConfiguration: ClientConfiguration,
	folder: Pick<Folder, "name">,
	parentFolder: Pick<Folder, "id">,
	failOnDuplicateName?: boolean,
): Promise<FolderVo> => {
	const body = JSON.stringify({
		displayName: folder.name,
		parentFolderId: parentFolder.id,
		failOnDuplicateName: failOnDuplicateName ?? false,
	});
	const response = await makePermanentApiCall(
		clientConfiguration,
		"/folder/post",
		{
			method: "POST",
			body,
		},
	);
	const responseText = await response.text();
	return typedJsonParse(responseText, isFolderVo);
};
