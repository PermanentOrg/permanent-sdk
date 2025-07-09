import path from "node:path";
import nock from "nock";
import { getAllArchiveVos } from "..";
import { ValidationError } from "../../errors";

describe("getAllArchiveVos", () => {
	it("should return an array of archive VOs", async () => {
		nock("https://permanent.local")
			.get("/api/archive/getAllArchives")
			.replyWithFile(
				200,
				path.join(
					__dirname,
					"fixtures",
					"getAllArchiveVos",
					"multipleArchives.json",
				),
				{
					"Content-Type": "application/json",
				},
			);

		const archiveVos = await getAllArchiveVos({
			bearerToken: "12345",
			baseUrl: "https://permanent.local/api",
		});

		expect(archiveVos).toMatchSnapshot();
	});

	it("should error when provided an invalid response", async () => {
		nock("https://permanent.local")
			.get("/api/archive/getAllArchives")
			.reply(200, '["Not at all an archiveVO"]', {
				"Content-Type": "application/json",
			});

		await expect(
			getAllArchiveVos({
				bearerToken: "12345",
				baseUrl: "https://permanent.local/api",
			}),
		).rejects.toBeInstanceOf(ValidationError);
	});
});
