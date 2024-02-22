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
createShareLink(
  clientConfiguration: ClientConfiguration,
  fileSystemItem: FileSystemItem,
  maxUses?: number,
  showPreview?: boolean,
  defaultAccessRole?: AccessRole,
): Promise<ShareLink>
```

`maxUses`, `showPreview`, and `defaultAccessRole` are optional. If `maxUses` is not set, the share link will have
unlimited uses. If `showPreview` is not set, the share link will not show a preview image. If `defaultAccessRole` is not
set, share recipients will have the Viewer role. Note that if a share link already exists for the given
`FileSystemItem`, this endpoint will return that `ShareLink` without editing it. If the `ShareLink` returned doesn't
have the settings you passed in, this is probably what happened.

#### updateShareLink
```
updateShareLink(
  configuration: ClientConfiguration,
  shareLink: ShareLink,
): Promise<ShareLink>
```

Each non-readonly property of the share link will be updated to match `shareLink`.
