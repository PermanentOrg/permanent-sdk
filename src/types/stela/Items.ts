import { ajv } from "../../utils";
import type { JSONSchemaType, ValidateFunction } from "ajv";

export interface Items<T> {
	items: T[];
}

export const generateIsItems = <T>(
	itemSchema: JSONSchemaType<T>,
): ValidateFunction<Items<T>> =>
	ajv.compile<Items<T>>({
		type: "object",
		properties: {
			items: {
				type: "array",
				items: itemSchema,
			},
		},
		required: ["items"],
		additionalProperties: false,
	});
