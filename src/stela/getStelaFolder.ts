import { makeStelaApiCall, typedJsonParse } from "../utils";
import {
	generateIsItems,
	stelaFolderSchema,
	type ClientConfiguration,
	type StelaFolder,
} from "../types";

export const getStelaFolder = async (
	clientConfiguration: ClientConfiguration,
	folderId: number,
): Promise<StelaFolder> => {
	const queryParams = new URLSearchParams({
		"folderIds[]": `${folderId}`,
	});
	const response = await makeStelaApiCall(
		clientConfiguration,
		`/folder?${queryParams.toString()}`,
		{ method: "GET" },
	);
	const responseText = await response.text();
	const {
		items: [item],
	} = typedJsonParse(responseText, generateIsItems(stelaFolderSchema));

	/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition --
	 * This is one of the documented cases where a disable is considered
	 * necessary by the rule itself: https://typescript-eslint.io/rules/no-unnecessary-condition/#possibly-undefined-indexed-access
	 */
	if (item === undefined) {
		throw new Error("Folder not found");
	}
	return item;
};
