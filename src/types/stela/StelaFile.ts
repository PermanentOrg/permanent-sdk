import { ajv } from "../../utils/ajv";
import type { JSONSchemaType } from "ajv";

export interface StelaFile {
	fileId: number;
	size: number;
	format: string;
	type: string;
	fileUrl: string;
	downloadUrl: string;
	createdAt: string;
	updatedAt: string;
}

export const stelaFileSchema: JSONSchemaType<StelaFile> = {
	type: "object",
	properties: {
		fileId: {
			type: "integer",
		},
		size: {
			type: "number",
		},
		format: {
			type: "string",
		},
		type: {
			type: "string",
		},
		fileUrl: {
			type: "string",
		},
		downloadUrl: {
			type: "string",
		},
		createdAt: {
			type: "string",
		},
		updatedAt: {
			type: "string",
		},
	},
	required: [
		"fileId",
		"size",
		"format",
		"type",
		"fileUrl",
		"downloadUrl",
		"createdAt",
		"updatedAt",
	],
};

export const isStelaFile = ajv.compile(stelaFileSchema);
