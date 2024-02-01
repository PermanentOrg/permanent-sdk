import { ajv } from '../../utils/ajv';
import type { JSONSchemaType } from 'ajv';
import type { BaseVo } from './BaseVo';

export interface ShareLinkVo extends BaseVo {
  shareby_urlId: number;
  folder_linkId: number;
  status: string;
  urlToken: string;
  shareUrl: string;
  uses?: number | null;
  maxUses?: number | null;
  autoApproveToggle?: number | null;
  previewToggle?: number | null;
  defaultAccessRole?: string | null;
  expiresDT?: string | null;
  byAccountId: number;
  byArchiveId: number;
}

export const shareLinkVoSchema: JSONSchemaType<ShareLinkVo> = {
  type: 'object',
  properties: {
    shareby_urlId: { type: 'number' },
    folder_linkId: { type: 'number' },
    status: { type: 'string' },
    urlToken: { type: 'string' },
    shareUrl: { type: 'string' },
    uses: { type: 'number', nullable: true },
    maxUses: { type: 'number', nullable: true },
    autoApproveToggle: { type: 'number', nullable: true },
    previewToggle: { type: 'number', nullable: true },
    defaultAccessRole: { type: 'string', nullable: true },
    expiresDT: { type: 'string', nullable: true },
    byAccountId: { type: 'number' },
    byArchiveId: { type: 'number' },
    createdDT: { type: 'string' },
    updatedDT: { type: 'string' },
  },
  required: ['shareby_urlId', 'status', 'folder_linkId', 'urlToken', 'shareUrl', 'byAccountId', 'byArchiveId',
    'createdDT',
    'updatedDT',
  ],
};

export const isShareLinkVo = ajv.compile(shareLinkVoSchema);
