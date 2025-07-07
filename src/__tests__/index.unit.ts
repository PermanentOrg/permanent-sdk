import * as externalExports from "..";
import * as sdkExports from "../sdk";
import * as sdkTypes from "../types/sdk";

describe("package exports", () => {
	it("should export all SDK methods", () => {
		expect(externalExports).toEqual(expect.objectContaining(sdkExports));
	});
	it("should export all types", () => {
		expect(externalExports).toEqual(expect.objectContaining(sdkTypes));
	});
});
