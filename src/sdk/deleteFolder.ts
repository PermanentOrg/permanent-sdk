import { deleteFolderVo } from "../api";
import type { ClientConfiguration } from "../types";

export interface DeleteFolderParams {
	folderId: number;
}

export const deleteFolder = async (
	clientConfiguration: ClientConfiguration,
	params: DeleteFolderParams,
): Promise<void> => deleteFolderVo(clientConfiguration, params.folderId);
