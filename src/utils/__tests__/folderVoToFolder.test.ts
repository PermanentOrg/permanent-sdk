import { folderVoToFolder } from "..";

describe("folderVoToFolder", () => {
	it("should properly populate a Folder based on FolderVo data with undefined fields", () => {
		const folderVo = {
			folderId: 42,
			folder_linkId: 42,
			ChildItemVOs: [],
			displayName: "Hello!",
			downloadName: "Hello! (1)",
			displayDT: undefined,
			createdDT: "2022-08-10T14:59:03.853Z",
			updatedDT: "2022-09-10T14:59:03.853Z",
		};
		const folder = folderVoToFolder(folderVo);
		expect(folder).toEqual({
			id: 42,
			fileSystemId: 42,
			archiveRecords: [],
			folders: [],
			name: "Hello!",
			size: 0,
			fileSystemCompatibleName: "Hello! (1)",
			displayDate: null,
			createdAt: new Date("2022-08-10T14:59:03.853Z"),
			updatedAt: new Date("2022-09-10T14:59:03.853Z"),
		});
	});

	it("should properly populate a Folder based on FolderVo data with null fields", () => {
		const folderVo = {
			folderId: 42,
			folder_linkId: 42,
			ChildItemVOs: [],
			displayName: "Hello!",
			downloadName: "Hello! (1)",
			displayDT: null,
			createdDT: "2022-08-10T14:59:03.853Z",
			updatedDT: "2022-09-10T14:59:03.853Z",
		};
		const folder = folderVoToFolder(folderVo);
		expect(folder).toEqual({
			id: 42,
			fileSystemId: 42,
			archiveRecords: [],
			folders: [],
			name: "Hello!",
			size: 0,
			fileSystemCompatibleName: "Hello! (1)",
			displayDate: null,
			createdAt: new Date("2022-08-10T14:59:03.853Z"),
			updatedAt: new Date("2022-09-10T14:59:03.853Z"),
		});
	});
});
