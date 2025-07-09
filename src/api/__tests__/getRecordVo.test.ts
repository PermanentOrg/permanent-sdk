import path from "node:path";
import nock from "nock";
import { getRecordVo } from "..";
import { ValidationError } from "../../errors";

describe("getRecordVo", () => {
	it("should return the record VO", async () => {
		nock("https://permanent.local")
			.get("/api/record/get")
			.query({
				recordId: 512,
				archiveId: 1,
			})
			.replyWithFile(
				200,
				path.join(__dirname, "fixtures", "getRecordVo", "recordVo.json"),
				{
					"Content-Type": "application/json",
				},
			);

		const recordVo = await getRecordVo(
			{
				bearerToken: "12345",
				baseUrl: "https://permanent.local/api",
			},
			512,
			1,
		);

		expect(recordVo).toMatchSnapshot();
	});

	it("should error when provided an invalid response", async () => {
		nock("https://permanent.local")
			.get("/api/record/get")
			.query({
				recordId: 512,
				archiveId: 1,
			})
			.reply(200, '["Not at all a recordVo"]', {
				"Content-Type": "application/json",
			});

		await expect(
			getRecordVo(
				{
					bearerToken: "12345",
					baseUrl: "https://permanent.local/api",
				},
				512,
				1,
			),
		).rejects.toBeInstanceOf(ValidationError);
	});
});
