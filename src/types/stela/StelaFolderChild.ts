import { type StelaRecord, stelaRecordSchema } from "./StelaRecord";
import { type StelaFolder, stelaFolderSchema } from "./StelaFolder";
import type { JSONSchemaType } from "ajv";

type StelaFolderChild = StelaRecord | StelaFolder;

const stelaFolderChildSchema: JSONSchemaType<StelaFolderChild> = {
	type: "object",
	oneOf: [stelaRecordSchema, stelaFolderSchema],
};

export { type StelaFolderChild, stelaFolderChildSchema };
