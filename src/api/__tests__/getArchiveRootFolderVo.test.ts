import path from "node:path";
import nock from "nock";
import { getArchiveRootFolderVo } from "..";
import { ValidationError } from "../../errors";

describe("getArchiveRootFolderVo", () => {
	it("should return the root folder VO", async () => {
		nock("https://permanent.local")
			.get("/api/folder/getRoot")
			.query({ archiveId: 1 })
			.replyWithFile(
				200,
				path.join(
					__dirname,
					"fixtures",
					"getArchiveRootFolderVo",
					"archiveRoot.json",
				),
				{
					"Content-Type": "application/json",
				},
			);

		const archiveVos = await getArchiveRootFolderVo(
			{
				bearerToken: "12345",
				baseUrl: "https://permanent.local/api",
			},
			1,
		);

		expect(archiveVos).toMatchSnapshot();
	});

	it("should error when provided an invalid response", async () => {
		nock("https://permanent.local")
			.get("/api/folder/getRoot")
			.query({ archiveId: 1 })
			.reply(200, '["Not at all a folderVo"]', {
				"Content-Type": "application/json",
			});

		await expect(
			getArchiveRootFolderVo(
				{
					bearerToken: "12345",
					baseUrl: "https://permanent.local/api",
				},
				1,
			),
		).rejects.toBeInstanceOf(ValidationError);
	});
});
