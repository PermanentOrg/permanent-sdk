import { stelaFolderToFolder } from "../utils";
import { getStelaFolder, getStelaFolderChildren } from "../stela";
import { stelaRecordToArchiveRecord } from "../utils/stelaRecordToArchiveRecord";
import { isStelaFolder, isStelaRecord } from "../types";
import type {
	Folder,
	ClientConfiguration,
	ArchiveRecord,
	StelaFolder,
	StelaRecord,
} from "../types";

export interface GetFolderParams {
	folderId: number;
}

const LOAD_CHILDREN_PAGE_SIZE = 100;

const loadAllStelaChildrenForFolder = async (
	clientConfiguration: ClientConfiguration,
	folderId: number,
): Promise<Array<StelaFolder | StelaRecord>> => {
	const children: Array<StelaRecord | StelaFolder> = [];
	let cursor: string | null = null;
	let allChildrenLoaded = false;

	while (!allChildrenLoaded) {
		allChildrenLoaded = true; // Defensively default to ending the loop

		const page = await getStelaFolderChildren(
			clientConfiguration,
			folderId,
			cursor,
			LOAD_CHILDREN_PAGE_SIZE,
		);
		const {
			pagination: { nextCursor },
		} = page;
		cursor = nextCursor;
		children.push(...page.items);

		// If this was a full page, loop one more time to get the next page
		if (page.items.length === LOAD_CHILDREN_PAGE_SIZE) {
			allChildrenLoaded = false;
		}
	}
	return children;
};

const getFoldersFromStelaChildren = (
	stelaChildren: Array<StelaFolder | StelaRecord>,
): Folder[] =>
	stelaChildren.reduce((acc: Folder[], stelaChild) => {
		if (isStelaFolder(stelaChild)) {
			acc.push(stelaFolderToFolder(stelaChild));
		}
		return acc;
	}, []);

const getArchiveRecordsFromStelaChildren = (
	stelaChildren: Array<StelaFolder | StelaRecord>,
): ArchiveRecord[] =>
	stelaChildren.reduce((acc: ArchiveRecord[], stelaChild) => {
		if (isStelaRecord(stelaChild)) {
			acc.push(stelaRecordToArchiveRecord(stelaChild));
		}
		return acc;
	}, []);

export const getFolder = async (
	clientConfiguration: ClientConfiguration,
	params: GetFolderParams,
): Promise<Folder> => {
	const folder = stelaFolderToFolder(
		await getStelaFolder(clientConfiguration, params.folderId),
	);
	const stelaChildren = await loadAllStelaChildrenForFolder(
		clientConfiguration,
		params.folderId,
	);
	const folders = getFoldersFromStelaChildren(stelaChildren);
	const archiveRecords = getArchiveRecordsFromStelaChildren(stelaChildren);
	return {
		...folder,
		folders,
		archiveRecords,
	};
};
