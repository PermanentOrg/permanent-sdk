import { ajv } from '../../utils/ajv';
import type { JSONSchemaType } from 'ajv';

// The `presignedPost` type definition is ultimately driven by the AWS S3 type definitions
// and come from our upload service:
// https://github.com/PermanentOrg/upload-service/blob/main/src/services/fileDestinationUrl.service.ts
export interface PresignedPost {
  url: string;
  fields: {
    [key: string]: string;
    Policy: string;
    'X-Amz-Signature': string;
  };
}

export const presignedPostSchema: JSONSchemaType<PresignedPost> = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
    },
    fields: {
      type: 'object',
      properties: {
        Policy: {
          type: 'string',
        },
        'X-Amz-Signature': {
          type: 'string',
        },
      },
      required: [
        'Policy',
        'X-Amz-Signature',
      ],
    },
  },
  required: [
    'url',
    'fields',
  ],
};

export const isPresignedPost = ajv.compile(presignedPostSchema);
