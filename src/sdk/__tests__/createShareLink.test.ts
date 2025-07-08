import nock from "nock";
import { createShareLink } from "..";
import { AccessRole } from "../../types";

describe("createShareLink", () => {
	test("should create a share link", async () => {
		nock("https://permanent.local")
			.post("/api/share/generateShareLink", {
				folderLinkId: 8306,
				maxUses: 0,
				previewToggle: false,
				defaultAccessRole: "access.role.viewer",
			})
			.replyWithFile(
				200,
				`${__dirname}/fixtures/createShareLink/shareLinkVo.json`,
				{ "Content-Type": "application/json" },
			);

		const shareLink = await createShareLink(
			{
				bearerToken: "12345",
				baseUrl: "https://permanent.local/api",
			},
			{
				fileSystemItem: { fileSystemId: 8306 },
				maxUses: 0,
				showPreview: false,
				defaultAccessRole: AccessRole.Viewer,
			},
		);

		expect(shareLink).toMatchSnapshot();
	});
});
