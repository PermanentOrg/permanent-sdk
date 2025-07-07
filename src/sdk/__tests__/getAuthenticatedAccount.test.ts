import path from "node:path";
import nock from "nock";
import { getAuthenticatedAccount } from "..";

describe("getAuthenticatedAccount", () => {
	it("should return an Account", async () => {
		nock("https://permanent.local")
			.get("/api/account/getAuthenticatedAccount")
			.replyWithFile(
				200,
				path.join(
					__dirname,
					"fixtures",
					"getAuthenticatedAccount",
					"accountVo.json",
				),
				{
					"Content-Type": "application/json",
				},
			);

		const account = await getAuthenticatedAccount({
			bearerToken: "12345",
			baseUrl: "https://permanent.local/api",
		});

		expect(account).toMatchSnapshot();
	});
});
