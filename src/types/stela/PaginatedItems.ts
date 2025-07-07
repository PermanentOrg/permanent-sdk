import type { JSONSchemaType, ValidateFunction } from "ajv";
import { ajv } from "../../utils";

export interface PaginatedItems<T> {
	items: T[];
	pagination: {
		nextCursor: string;
		nextPage: string;
		totalPages: number;
	};
}

export const generateIsPaginatedItems = <T>(
	itemSchema: JSONSchemaType<T>,
): ValidateFunction<PaginatedItems<T>> =>
	ajv.compile<PaginatedItems<T>>({
		type: "object",
		properties: {
			items: {
				type: "array",
				items: itemSchema,
			},
			pagination: {
				type: "object",
				properties: {
					nextCursor: { type: "string" },
					nextPage: { type: "string" },
					totalPages: { type: "number" },
				},
				required: ["nextCursor", "nextPage", "totalPages"],
				additionalProperties: false,
			},
		},
		required: ["items", "pagination"],
		additionalProperties: false,
	});
