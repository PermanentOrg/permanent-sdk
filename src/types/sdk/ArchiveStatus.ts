// These statuses are defined in the permanent backend:
// https://github.com/PermanentOrg/back-end/blob/main/library/definition/perm.constants.php
export enum ArchiveStatus {
  Deleted = 'status.generic.deleted',
  Generating = 'status.archive.gen_avatar',
  Ok = 'status.generic.ok',
  Unknown = 'unknown', // This status does not exist on the backend
}
