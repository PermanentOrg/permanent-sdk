import fs from "node:fs";
import { URL } from "node:url";
import nock from "nock";
import { uploadFile } from "..";
import { bodyContainsMultipartFormFields } from "../../test/utils";

describe("uploadFile", () => {
	it("should post file data to S3", async () => {
		const s3UploadVo = {
			destinationUrl:
				"https://permanet.local/_slifty/unprocessed/12345678-e6ef-4238-85d3-20001abebb63",
			presignedPost: {
				url: "https://permanent.local/thisWouldBeAnAwsUrl",
				fields: {
					Key: "_slifty/unprocessed/12345678-e6ef-4238-85d3-20001abebb63",
					bucket: "permanent-local",
					"X-Amz-Algorithm": "AWS4-HMAC-SHA256",
					"X-Amz-Credential": "12345678/20230123/us-west-2/s3/aws4_request",
					"X-Amz-Date": "20230123T210239Z",
					Policy: "123456789=",
					"X-Amz-Signature": "1234567890",
				},
			},
		};
		const presignedPostUrl = new URL(s3UploadVo.presignedPost.url);
		const filePath = `${__dirname}/fixtures/createArchiveRecord/myFile.txt`;
		const fileDataStream = fs.createReadStream(filePath);
		const fileData = fs.readFileSync(filePath);
		const { size: fileSize } = fs.statSync(filePath);

		nock("https://permanent.local")
			.post("/api/record/getPresignedUrl", {
				displayName: "myFile",
				parentFolderId: 1,
				uploadFileName: "myFile.txt",
				fileType: "text/plain",
				size: fileSize,
			})
			.reply(200, s3UploadVo, {
				"Content-Type": "application/json",
			});

		nock(presignedPostUrl.origin)
			.post(presignedPostUrl.pathname, (body) =>
				bodyContainsMultipartFormFields(body, {
					...s3UploadVo.presignedPost.fields,
					file: fileData.toString(),
				}),
			)
			.reply(200);

		const fileUrl = await uploadFile(
			{
				bearerToken: "12345",
				baseUrl: "https://permanent.local/api",
			},
			{
				fileData: fileDataStream,
				file: {
					size: fileSize,
					contentType: "text/plain",
				},
				item: {
					displayName: "myFile",
					fileSystemCompatibleName: "myFile.txt",
				},
				parentFolder: {
					id: 1,
				},
			},
		);

		expect(fileUrl).toBe(
			"https://permanet.local/_slifty/unprocessed/12345678-e6ef-4238-85d3-20001abebb63",
		);
	});
});
