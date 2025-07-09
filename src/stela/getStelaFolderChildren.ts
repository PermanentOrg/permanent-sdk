import { URLSearchParams } from "node:url";
import { makeStelaApiCall, typedJsonParse } from "../utils";
import {
	generateIsPaginatedItems,
	type ClientConfiguration,
	type PaginatedItems,
	type StelaFolder,
	type StelaRecord,
} from "../types";
import { stelaFolderChildSchema } from "../types/stela/StelaFolderChild";

export const getStelaFolderChildren = async (
	clientConfiguration: ClientConfiguration,
	folderId: number,
	cursor: string | null,
	pageSize: number,
): Promise<PaginatedItems<StelaFolder | StelaRecord>> => {
	const queryParams = new URLSearchParams({
		pageSize: `${pageSize}`,
	});
	if (cursor !== null) {
		queryParams.append("cursor", cursor);
	}
	const response = await makeStelaApiCall(
		clientConfiguration,
		`/folder/${folderId}/children?${queryParams.toString()}`,
		{ method: "GET" },
	);
	const responseText = await response.text();
	return typedJsonParse(
		responseText,
		generateIsPaginatedItems(stelaFolderChildSchema),
	);
};
