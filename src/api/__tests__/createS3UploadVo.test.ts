import nock from "nock";
import { createS3UploadVo } from "..";
import { ValidationError } from "../../errors";

describe("createS3UploadVo", () => {
	it("should create a presigned post", async () => {
		nock("https://permanent.local")
			.post("/api/record/getPresignedUrl", {
				displayName: "testFile.txt",
				parentFolderId: 1,
				uploadFileName: "testFile",
				fileType: "text/plain",
				size: 12,
			})
			.replyWithFile(
				200,
				`${__dirname}/fixtures/createS3UploadVo/s3Upload.json`,
				{
					"Content-Type": "application/json",
				},
			);

		const s3UploadVo = await createS3UploadVo(
			{
				bearerToken: "12345",
				baseUrl: "https://permanent.local/api",
			},
			{
				displayName: "testFile.txt",
				parentFolderId: 1,
				uploadFileName: "testFile",
				fileType: "text/plain",
				size: 12,
			},
		);

		expect(s3UploadVo).toMatchSnapshot();
	});

	it("should error when provided an invalid response", async () => {
		nock("https://permanent.local")
			.post("/api/record/getPresignedUrl", {
				displayName: "testFile.txt",
				parentFolderId: 1,
				uploadFileName: "testFile",
				fileType: "text/plain",
				size: 12,
			})
			.reply(200, '["Not at all a s3UploadVo"]', {
				"Content-Type": "application/json",
			});

		await expect(
			createS3UploadVo(
				{
					bearerToken: "12345",
					baseUrl: "https://permanent.local/api",
				},
				{
					displayName: "testFile.txt",
					parentFolderId: 1,
					uploadFileName: "testFile",
					fileType: "text/plain",
					size: 12,
				},
			),
		).rejects.toBeInstanceOf(ValidationError);
	});
});
