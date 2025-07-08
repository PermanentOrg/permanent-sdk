import { ajv } from "../../utils/ajv";
import { presignedPostSchema } from "./PresignedPost";
import type { JSONSchemaType } from "ajv";
import type { PresignedPost } from "./PresignedPost";

export interface S3UploadVo {
	destinationUrl: string;
	presignedPost: PresignedPost;
}

export const s3UploadVoSchema: JSONSchemaType<S3UploadVo> = {
	type: "object",
	properties: {
		destinationUrl: {
			type: "string",
		},
		presignedPost: presignedPostSchema,
	},
	required: ["destinationUrl", "presignedPost"],
};

export const isS3UploadVo = ajv.compile(s3UploadVoSchema);
