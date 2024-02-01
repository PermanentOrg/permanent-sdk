import { generateEnumTypeguard } from '../../utils/generateEnumTypeguard';

// These roles are defined in the permanent backend:
// https://github.com/PermanentOrg/back-end/blob/main/library/definition/perm.constants.php
export enum AccessRole {
  Administrator = 'access.role.admin',
  Contributor = 'access.role.contributor',
  Curator = 'access.role.curator',
  Editor = 'access.role.editor',
  Manager = 'access.role.manager',
  Owner = 'access.role.owner',
  Viewer = 'access.role.viewer',
}

export const isAccessRole = generateEnumTypeguard(AccessRole);
