import path from "node:path";
import nock from "nock";
import { getAuthenticatedAccountVo } from "..";
import { ValidationError } from "../../errors";

describe("getAuthenticatedAccountVo", () => {
	it("should return the account VO", async () => {
		nock("https://permanent.local")
			.get("/api/account/getAuthenticatedAccount")
			.replyWithFile(
				200,
				path.join(
					__dirname,
					"fixtures",
					"getAuthenticatedAccountVo",
					"accountVo.json",
				),
				{
					"Content-Type": "application/json",
				},
			);

		const accountVo = await getAuthenticatedAccountVo({
			bearerToken: "12345",
			baseUrl: "https://permanent.local/api",
		});

		expect(accountVo).toMatchSnapshot();
	});

	it("should error when provided an invalid response", async () => {
		nock("https://permanent.local")
			.get("/api/account/getAuthenticatedAccount")
			.reply(200, '["Not at all an AccountVo"]', {
				"Content-Type": "application/json",
			});

		await expect(
			getAuthenticatedAccountVo({
				bearerToken: "12345",
				baseUrl: "https://permanent.local/api",
			}),
		).rejects.toBeInstanceOf(ValidationError);
	});
});
