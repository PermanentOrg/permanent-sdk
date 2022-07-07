// These types are defined in the permanent backend:
// https://github.com/PermanentOrg/back-end/blob/main/library/definition/perm.constants.php
export enum RecordType {
  Archive = 'type.record.archive',
  Audio = 'type.record.audio',
  Document = 'type.record.document',
  Experience = 'type.record.experience',
  Folder = 'type.record.folder',
  Gedcom = 'Genealogy',
  GedZip = 'Genealogy Archive',
  Image = 'type.record.image',
  Pdf = 'type.record.pdf',
  Presentation = 'type.record.presentation',
  Reference = 'type.record.reference',
  Spreadsheet = 'type.record.spreadsheet',
  Unknown = 'type.record.unknown',
  Video = 'type.record.video',
}
