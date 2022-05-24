// These types are defined in the permanent backend:
// https://github.com/PermanentOrg/back-end/blob/main/library/definition/perm.constants.php
export enum Status {
  Declined = 'status.generic.declined',
  Deleted = 'status.generic.deleted',
  Error = 'status.generic.error',
  Invited = 'status.generic.invited',
  ManualReview = 'status.generic.manual_review',
  Ok = 'status.generic.ok',
  Orphaned = 'status.generic.orphaned',
  Pending = 'status.generic.pending',
  Undefined = 'status.generic.undefined',
}
