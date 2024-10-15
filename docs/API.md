# API Documentation

## Configuration
Each function provided by this SDK takes a `ClientConfiguration` object:
```
{
  bearerToken: string;
  baseUrl?: string;
}
```

`bearerToken` is required and should be a JWT corresponding to a logged in Permanent account, such as that returned by
Permanent's `/api/auth/login` endpoint. `baseUrl` is optional, with the default value of `https://permanent.org/api`.
Setting `baseUrl` is only necessary when testing the SDK against one of Permanent's test environments.

## Account

### Models

#### Account
```
Account {
  id: number;
  isSftpDeletionEnabled: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
```

### Functions

#### getAuthenticatedAccount
```
getAuthenticatedAccount(
  clientConfiguration: ClientConfiguration,
): Promise<Account>
```

## Files

### Models

#### DerivativeType
```
enum DerivativeType {
  Converted = 'file.format.converted',
  FullHd = 'file.format.1920x1080',
  Original = 'file.format.original',
  Unknown = 'UNKNOWN',
}
```

#### File
```
File {
  id: number;
  size: number;
  contentType: string;
  readonly derivativeType: DerivativeType;
  readonly fileUrl: string;
  readonly downloadUrl: string;
  readonly checksum: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
```

### Functions

#### uploadFile
```
UploadFileParams {
  fileData: Buffer | Readable;
  file: Pick<File, 'contentType' | 'size'>;
  item: Pick<ArchiveRecord, 'displayName' | 'fileSystemCompatibleName'>;
  parentFolder: Pick<Folder, 'id'>;
}
```

```
uploadFile(
  clientConfiguration: ClientConfiguration,
  params: UploadFileParams,
): Promise<string>
```
The string returned is the file's location in S3.

Notes: `fileSystemCompatibleName` is referred to as `downloadName`
elsewhere. It should be unique in a given folder so that folder
contents can be downloaded without overwriting each other. On first
creation, use the original file or folder name, knowing that the
backend may adjust this value to make sure it is unique in the parent
folder. Note that we have seen errors when `fileData` is explicitly
set to use `utf8` encoding. If using `createReadStream` to create a
`Readable` it may be best to avoid specifying an encoding.

## Records

### Models

#### ArchiveRecordType
```
enum ArchiveRecordType {
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
```

#### Status
```
enum Status {
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
```

#### ArchiveRecord
```
ArchiveRecord {
  id: number;
  fileSystemId: number;
  displayDate: Date;
  type: ArchiveRecordType;
  displayName: string;
  files: File[];
  readonly fileSystemCompatibleName: string;
  readonly status: Status;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
```

### Functions

#### createArchiveRecord
```
CreateArchiveRecordParams {
  s3Url: string;
  file: Pick<Partial<File>, 'contentType'> & Pick<File, 'size'>;
  item: Pick<ArchiveRecord, 'displayName' | 'fileSystemCompatibleName'>;
  parentFolder: Pick<Folder, 'id'>;
}
```

s3Url will generally be the value returned by `uploadFile`. Run
`createArchiveRecord` to store information about uploaded files in the
Permanent database.

file.contentType is deprecated. The field is still accepted for backwards compatibility, but it is not used.
The content type is determined by the file extension of the uploaded file.

```
createArchiveRecord(
  clientConfiguration: ClientConfiguration,
  params: CreateArchiveRecordParams,
): Promise<ArchiveRecord>
```

#### deleteArchiveRecord
```
DeleteArchiveRecordParams {
  archiveRecordId: number;
}
```

```
deleteArchiveRecord(
  clientConfiguration: ClientConfiguration,
  params: DeleteArchiveRecordParams,
): Promise<void>
```

#### getArchiveRecord
```
GetArchiveRecordParams {
  archiveRecordId: number;
  archiveId: number;
}
```

```
getArchiveRecord(
  clientConfiguration: ClientConfiguration,
  params: GetArchiveRecordParams,
): Promise<ArchiveRecord>
```

## Folders

### Models

#### Folder
```
Folder {
  id: number;
  fileSystemId: number;
  name: string;
  size: number;
  displayDate?: Date;
  readonly fileSystemCompatibleName: string;
  readonly folders: Folder[];
  readonly archiveRecords: ArchiveRecord[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
```

### Function

#### createFolder
```
CreateFolderParams {
  folder: Pick<Folder, 'name'>;
  parentFolder: Pick<Folder, 'id'>;
}
```

```
createFolder(
  clientConfiguration: ClientConfiguration,
  params: CreateFolderParams,
): Promise<Folder>
```

#### deleteFolder
```
DeleteFolderParams {
  folderId: number;
}
```

```
deleteFolder(
  clientConfiguration: ClientConfiguration,
  params: DeleteFolderParams,
): Promise<void>
```

#### getArchiveFolders
```
GetArchiveFoldersParams {
  archiveId: number;
}
```

```
getArchiveFolders(
  clientConfiguration: ClientConfiguration,
  params: GetArchiveFoldersParams,
): Promise<Folder[]>
```

#### getFolder
```
GetFolderParams {
  folderId: number;
  archiveId: number;
}
```

```
getFolder(
  clientConfiguration: ClientConfiguration,
  params: GetFolderParams,
): Promise<Folder>
```

## Archives

### Models
```
Archive {
  id: number;
  slug: string;
  name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
```

### Functions

#### getArchives
```
getArchives(
  clientConfiguration: ClientConfiguration,
): Promise<Archive[]>
```

## Shares

### Models

#### FileSystemItem
A `FileSystemItem` represents a record or folder stored in Permanent
```
FileSystemItem {
  fileSystemId: number;
}
```

#### ShareLink
```
ShareLink {
  readonly id: number;
  readonly sharedFileSystemItemId: number;
  readonly url: string;
  readonly urlToken: string;
  readonly byAccountId: number;
  readonly uses?: number;
  maxUses?: number;
  autoApprove?: boolean;
  showPreview?: boolean;
  defaultAccessRole?: AccessRole;
  expiresAt?: Date;
  readonly status: Status;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
```

### Functions

#### createShareLink
```
CreateShareLinkParams {
  fileSystemItem: FileSystemItem;
  maxUses?: number;
  showPreview?: boolean;
  defaultAccessRole?: AccessRole;
}
```

```
createShareLink(
  clientConfiguration: ClientConfiguration,
  params: CreateShareLInkParams
): Promise<ShareLink>
```

`maxUses`, `showPreview`, and `defaultAccessRole` are optional. If `maxUses` is not set, the share link will have
unlimited uses. If `showPreview` is not set, the share link will not show a preview image. If `defaultAccessRole` is not
set, share recipients will have the Viewer role. Note that if a share link already exists for the given
`FileSystemItem`, this endpoint will return that `ShareLink` without editing it. If the `ShareLink` returned doesn't
have the settings you passed in, this is probably what happened.

#### updateShareLink
```
UpdateShareLinkParams {
  shareLink: ShareLink;
}
```

```
updateShareLink(
  configuration: ClientConfiguration,
  params: UpdateShareLinkParams,
): Promise<ShareLink>
```

Each non-readonly property of the share link will be updated to match `shareLink`.

