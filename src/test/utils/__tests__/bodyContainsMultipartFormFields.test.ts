import { bodyContainsMultipartFormFields } from "..";

describe("bodyContainsMultipartFormFields", () => {
	it("should match a valid body ", async () => {
		const body = `----------------------------369405283061745602785268
Content-Disposition: form-data; name="firstField"

foo
----------------------------369405283061745602785268
Content-Disposition: form-data; name="secondField"

bar
----------------------------369405283061745602785268
Content-Disposition: form-data; name="file"
Content-Type: application/octet-stream

hello`;
		const expectedFields = {
			firstField: "foo",
			secondField: "bar",
		};
		expect(bodyContainsMultipartFormFields(body, expectedFields)).toBe(true);
	});

	it("should not match fields values with future field values", async () => {
		const body = `----------------------------369405283061745602785268
Content-Disposition: form-data; name="firstField"

bar
----------------------------369405283061745602785268
Content-Disposition: form-data; name="secondField"

foo
----------------------------369405283061745602785268
Content-Disposition: form-data; name="file"
Content-Type: application/octet-stream

hello`;
		const expectedFields = {
			firstField: "foo",
			secondField: "foo",
		};
		expect(bodyContainsMultipartFormFields(body, expectedFields)).toBe(false);
	});

	it("should not match a body that is not a string", async () => {
		const body = {
			firstField: "foo",
			secondField: "foo",
		};
		const expectedFields = {
			firstField: "foo",
			secondField: "foo",
		};
		expect(bodyContainsMultipartFormFields(body, expectedFields)).toBe(false);
	});
});
