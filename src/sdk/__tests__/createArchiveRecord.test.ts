import path from "node:path";
import fs from "node:fs";
import nock from "nock";
import { createArchiveRecord } from "..";

describe("createArchiveRecord", () => {
	it("should create an ArchiveRecord", async () => {
		const filePath = path.join(
			__dirname,
			"fixtures",
			"createArchiveRecord",
			"myFile.txt",
		);
		const { size: fileSize } = fs.statSync(filePath);

		nock("https://permanent.local")
			.post("/api/record/registerRecord", {
				s3url:
					"https://permanet.local/_slifty/unprocessed/12345678-e6ef-4238-85d3-20001abebb63",
				displayName: "myFile",
				parentFolderId: 1,
				uploadFileName: "myFile.txt",
				fileType: "text/plain",
				size: fileSize,
				failOnDuplicateName: false,
			})
			.replyWithFile(
				200,
				path.join(
					__dirname,
					"fixtures",
					"createArchiveRecord",
					"recordVo.json",
				),
				{
					"Content-Type": "application/json",
				},
			);

		const archiveRecord = await createArchiveRecord(
			{
				bearerToken: "12345",
				baseUrl: "https://permanent.local/api",
			},
			{
				s3Url:
					"https://permanet.local/_slifty/unprocessed/12345678-e6ef-4238-85d3-20001abebb63",
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

		expect(archiveRecord).toMatchSnapshot();
	});

	it("should pass the failOnDuplicateName parameter to the API", async () => {
		const filePath = path.join(
			__dirname,
			"fixtures",
			"createArchiveRecord",
			"myFile.txt",
		);
		const { size: fileSize } = fs.statSync(filePath);

		nock("https://permanent.local")
			.post("/api/record/registerRecord", {
				s3url:
					"https://permanet.local/_slifty/unprocessed/12345678-e6ef-4238-85d3-20001abebb63",
				displayName: "myFile",
				parentFolderId: 1,
				uploadFileName: "myFile.txt",
				fileType: "text/plain",
				size: fileSize,
				failOnDuplicateName: true,
			})
			.replyWithFile(
				200,
				path.join(
					__dirname,
					"fixtures",
					"createArchiveRecord",
					"recordVo.json",
				),
				{
					"Content-Type": "application/json",
				},
			);

		const archiveRecord = await createArchiveRecord(
			{
				bearerToken: "12345",
				baseUrl: "https://permanent.local/api",
			},
			{
				s3Url:
					"https://permanet.local/_slifty/unprocessed/12345678-e6ef-4238-85d3-20001abebb63",
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
				failOnDuplicateName: true,
			},
		);

		expect(archiveRecord).toMatchSnapshot();
	});
});
