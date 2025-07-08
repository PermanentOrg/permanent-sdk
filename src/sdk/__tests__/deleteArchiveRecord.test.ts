import nock from "nock";
import { deleteArchiveRecord } from "..";
import { HttpResponseError } from "../../errors";

describe("deleteArchiveRecord", () => {
	it("should not throw on successful deletion", async () => {
		nock("https://permanent.local")
			.delete("/api/record/delete?recordId=1")
			.reply(200);

		await expect(
			deleteArchiveRecord(
				{
					bearerToken: "12345",
					baseUrl: "https://permanent.local/api",
				},
				{
					archiveRecordId: 1,
				},
			),
		).resolves.not.toThrow();
	});

	it("should throw an error when receiving a 500 response", async () => {
		nock("https://permanent.local")
			.delete("/api/record/delete?recordId=1")
			.reply(500);

		await expect(
			deleteArchiveRecord(
				{
					bearerToken: "12345",
					baseUrl: "https://permanent.local/api",
				},
				{
					archiveRecordId: 1,
				},
			),
		).rejects.toThrow(HttpResponseError);
	});
});
