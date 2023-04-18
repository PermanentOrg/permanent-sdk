import type { JSONSchemaType } from 'ajv';
import { ajv } from '../../utils/ajv';
import type { BaseVo } from './BaseVo';

export interface AccountVo extends BaseVo {
  // These fields map to those defined in the base library ArchiveVO
  // https://github.com/PermanentOrg/back-end/blob/main/library/base/vo/base.account.vo.php
  accountId: number;
  allowSftpDeletion: boolean;
}

export const accountVoSchema: JSONSchemaType<AccountVo> = {
  type: 'object',
  properties: {
    accountId: {
      type: 'integer',
    },
    allowSftpDeletion: {
      type: 'boolean',
    },
    createdDT: {
      type: 'string',
    },
    updatedDT: {
      type: 'string',
    },
  },
  required: [
    'accountId',
    'createdDT',
    'updatedDT',
    'allowSftpDeletion',
  ],
};

export const isAccountVo = ajv.compile(accountVoSchema);
