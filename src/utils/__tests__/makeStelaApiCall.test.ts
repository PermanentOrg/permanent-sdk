import nock from "nock";
import { makeStelaApiCall } from "..";
import { HttpResponseError } from "../../errors";

describe("makeStelaApiCall", () => {
	it("should default calls to https://api.permanent.org/api/v2", async () => {
		nock("https://api.permanent.org")
			.get("/api/v2/testing")
			.reply(200, "it worked");

		const response = await makeStelaApiCall(
			{ bearerToken: "12345" },
			"/testing",
		);
		const responseBody = await response.text();

		expect(responseBody).toEqual("it worked");
	});

	it("should allow stelaBaseUrl overrides", async () => {
		nock("https://api.permanent.local")
			.get("/api/v2/testing")
			.reply(200, "it worked");

		const response = await makeStelaApiCall(
			{
				bearerToken: "12345",
				stelaBaseUrl: "https://api.permanent.local/api/v2",
			},
			"/testing",
		);
		const responseBody = await response.text();

		expect(responseBody).toEqual("it worked");
	});

	it("should populate the correct headers in its request", async () => {
		nock("https://api.permanent.local", {
			reqheaders: {
				Authorization: "Bearer 12345",
				"Request-Version": "2",
				"Content-Type": "application/json",
			},
		})
			.get("/api/v2/testing")
			.reply(200, "it worked");

		const response = await makeStelaApiCall(
			{
				bearerToken: "12345",
				stelaBaseUrl: "https://api.permanent.local/api/v2",
			},
			"/testing",
		);
		const responseBody = await response.text();

		expect(responseBody).toEqual("it worked");
	});

	it("should throw on a not-OK response", async () => {
		nock("https://api.permanent.local")
			.get("/api/v2/testing")
			.reply(404, "it did not work");

		const call = makeStelaApiCall(
			{
				bearerToken: "12345",
				stelaBaseUrl: "https://api.permanent.local/api/v2",
			},
			"/testing",
		);
		await expect(call).rejects.toThrow(HttpResponseError);
	});

	it("should retry if configured to do so", async () => {
		const mock = nock("https://api.permanent.local")
			.get("/api/v2/testing")
			.reply(404, "it did not work")
			.get("/api/v2/testing")
			.reply(200, "it worked");

		const response = await makeStelaApiCall(
			{
				bearerToken: "12345",
				stelaBaseUrl: "https://api.permanent.local/api/v2",
				retryOn: [404],
			},
			"/testing",
		);
		const responseBody = await response.text();

		expect(responseBody).toEqual("it worked");
		expect(mock.isDone()).toBe(true); // All mocked responses were invoked
	});

	it("should retry additional times than the default if configured to do so", async () => {
		const mock = nock("https://api.permanent.local")
			.get("/api/v2/testing")
			.reply(404, "it did not work")
			.get("/api/v2/testing")
			.reply(404, "it did not work")
			.get("/api/v2/testing")
			.reply(404, "it did not work")
			.get("/api/v2/testing")
			.reply(404, "it did not work")
			.get("/api/v2/testing")
			.reply(200, "it worked");

		const response = await makeStelaApiCall(
			{
				bearerToken: "12345",
				stelaBaseUrl: "https://api.permanent.local/api/v2",
				retryOn: [404],
				retries: 4,
				retryDelay: (attempt) => attempt * 0.01,
			},
			"/testing",
		);
		const responseBody = await response.text();

		expect(responseBody).toEqual("it worked");
		expect(mock.isDone()).toBe(true); // All mocked responses were invoked
	});
});
