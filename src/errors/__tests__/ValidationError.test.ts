import { ajv } from "../../utils/ajv";
import { ValidationError } from "..";

describe("ValidationError", () => {
	it("should construct with no AJV errors provided", () => {
		const message = "Only a message";
		const validationError = new ValidationError(message);
		expect(validationError.errors).toBe(undefined);
		expect(validationError.message).toBe(message);
	});

	it("should construct with AJV errors provided", () => {
		const validate = ajv.compile({
			type: "string",
		});
		validate(42);

		const message = "A message but also some errors";
		const { errors } = validate;
		const validationError = new ValidationError(message, errors);

		expect(validationError.message).toBe(message);
		expect(validationError.errors).toEqual(errors);
	});
});
