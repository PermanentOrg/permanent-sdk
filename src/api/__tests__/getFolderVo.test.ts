import path from "node:path";
import nock from "nock";
import { getFolderVo } from "..";
import { ValidationError } from "../../errors";

describe("getFolderVo", () => {
	it("should return the root folder VO", async () => {
		nock("https://permanent.local")
			.get("/api/folder/getWithChildren")
			.query({
				folderId: 7457,
				archiveId: 1,
			})
			.replyWithFile(
				200,
				path.join(__dirname, "fixtures", "getFolderVo", "folder.json"),
				{
					"Content-Type": "application/json",
				},
			);

		const folderVo = await getFolderVo(
			{
				bearerToken: "12345",
				baseUrl: "https://permanent.local/api",
			},
			7457,
			1,
		);

		expect(folderVo).toMatchSnapshot();
	});

	it("should return the folder VO when displayDateDT is null", async () => {
		nock("https://permanent.local")
			.get("/api/folder/getWithChildren")
			.query({
				folderId: 7457,
				archiveId: 1,
			})
			.replyWithFile(
				200,
				path.join(
					__dirname,
					"fixtures",
					"getFolderVo",
					"folderWithNullDisplayDt.json",
				),
				{
					"Content-Type": "application/json",
				},
			);

		const folderVo = await getFolderVo(
			{
				bearerToken: "12345",
				baseUrl: "https://permanent.local/api",
			},
			7457,
			1,
		);

		expect(folderVo).toMatchSnapshot();
	});

	it("should error when provided an invalid response", async () => {
		nock("https://permanent.local")
			.get("/api/folder/getWithChildren")
			.query({
				folderId: 7457,
				archiveId: 1,
			})
			.reply(200, '["Not at all a folderVo"]', {
				"Content-Type": "application/json",
			});

		await expect(
			getFolderVo(
				{
					bearerToken: "12345",
					baseUrl: "https://permanent.local/api",
				},
				7457,
				1,
			),
		).rejects.toBeInstanceOf(ValidationError);
	});
});
