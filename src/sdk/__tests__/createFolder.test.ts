import path from "node:path";
import nock from "nock";
import { createFolder } from "..";

describe("createFolder", () => {
	it("should create a folder", async () => {
		nock("https://permanent.local")
			.post("/api/folder/post", {
				displayName: "testFolder",
				parentFolderId: 1,
				failOnDuplicateName: false,
			})
			.replyWithFile(
				200,
				path.join(__dirname, "fixtures", "createFolder", "folder.json"),
				{
					"Content-Type": "application/json",
				},
			);

		const folder = await createFolder(
			{
				bearerToken: "12345",
				baseUrl: "https://permanent.local/api",
			},
			{
				folder: {
					name: "testFolder",
				},
				parentFolder: {
					id: 1,
				},
			},
		);

		expect(folder).toMatchSnapshot();
	});
	it("should use the failOnDuplicateName parameter if set", async () => {
		nock("https://permanent.local")
			.post("/api/folder/post", {
				displayName: "testFolder",
				parentFolderId: 1,
				failOnDuplicateName: true,
			})
			.replyWithFile(
				200,
				path.join(__dirname, "fixtures", "createFolder", "folder.json"),
				{
					"Content-Type": "application/json",
				},
			);

		const folder = await createFolder(
			{
				bearerToken: "12345",
				baseUrl: "https://permanent.local/api",
			},
			{
				folder: {
					name: "testFolder",
				},
				parentFolder: {
					id: 1,
				},
				failOnDuplicateName: true,
			},
		);

		expect(folder).toMatchSnapshot();
	});
});
