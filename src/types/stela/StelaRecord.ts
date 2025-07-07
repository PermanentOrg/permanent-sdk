import { ajv } from "../../utils/ajv";
import { stelaFileSchema } from "./StelaFile";
import type { StelaFile } from "./StelaFile";
import type { JSONSchemaType } from "ajv";

export interface StelaRecord {
	recordId: number;
	folderLinkId: number; // This is not documented and is not intended for use outside of the sdk
	displayName: string;
	downloadName: string;
	displayDate?: string | null; // see https://github.com/ajv-validator/ajv/issues/2163
	type: string;
	status: string;
	files: StelaFile[];
	createdAt: string;
	updatedAt?: string | null; // see https://github.com/ajv-validator/ajv/issues/2163
}

export const stelaRecordSchema: JSONSchemaType<StelaRecord> = {
	type: "object",
	properties: {
		recordId: {
			type: "integer",
		},
		folderLinkId: {
			type: "integer",
		},
		displayName: {
			type: "string",
		},
		downloadName: {
			type: "string",
		},
		displayDate: {
			type: "string",
			nullable: true,
		},
		type: {
			type: "string",
		},
		status: {
			type: "string",
		},
		files: {
			type: "array",
			items: stelaFileSchema,
		},
		createdAt: {
			type: "string",
		},
		updatedAt: {
			type: "string",
			nullable: true,
		},
	},
	required: [
		"recordId",
		"displayName",
		"downloadName",
		"type",
		"status",
		"files",
		"createdAt",
	],
};

export const isStelaRecord = ajv.compile(stelaRecordSchema);
