# Changelog for @permanentorg/sdk

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.10.0] - 2025-04-02

### Added

- SDK clients can now be configured to `retryOn` various HTTP status codes.

## [0.9.1] - 2025-03-13

### Fixed

- Stela endpoint response dates are no longer being incorrectly modified by the SDK.

## [0.9.0] - 2025-03-12

### Added

- ClientConfiguration now accepts a `stelaBaseUrl`

### Changed

- BREAKING CHANGE: Dropped support for Node 18.
- BREAKING CHANGE: getFolder() now uses stela endpoints, which uses `stelaBaseUrl`.
- Added optional failOnDuplicateName parameters to createFolder and createArchiveRecord

## [0.8.0] - 2024-08-28

### Changed

- BREAKING CHANGE: All functions now take either one or two arguments. The first argument is always the `ClientConfig`
  object. The second argument, if it is present, is always an object containing the rest of the parameters for the
  function. Documentation describing each function and its inputs has been added in API.md.

## [0.7.0] - 2024-02-23

### Added

- The `updateShareLink` function now exists
- The `createShareLink` function now exists

### Changed

- This package no longer supports Node v14.
- The `deleteFolder` and `deleteArchiveRecord` SDK methods now return void (was boolean).
- All SDK methods now throw if the server responds with a non-OK status.

### Added

- The `HttpResponseError` type now exists.

## [0.6.0] - 2023-05-18

### Changed

- The `createArchiveRecord` function no longer uploads files, clients must use the new `uploadFile` function for this.

### Added

- The `uploadFile` function now exists.

## [0.5.4] - 2023-04-18

### Fixed

- The `Account.isSftpDeletionEnabled` property is now populated based on the values provided by the Permanent API.

## [0.5.3] - 2023-04-03

### Added

- the `deleteFolder` function now exists.
- the `deleteArchiveRecord` function now exists.
- the `getAuthenticatedAccount` function now exists.
- The `Account` type now exists.

## [0.5.2] - 2023-03-02

### Added

- `Archive` now has a [`slug`](https://developer.mozilla.org/en-US/docs/Glossary/Slug) field.

## [0.5.1] - 2023-02-28

### Fixed

- Addressed an issue where `null` DisplayDT values returned by the server would cause an error.

## [0.5.0] - 2023-02-15

### Added

- The `createArchiveRecord` function now exists.

### Changed

- `Record` has been renamed to `ArchiveRecord`.
- `RecordType` has been renamed to `ArchiveRecordType`.
- `getRecord` has been renamed to `getArchiveRecord`.
- `File` now has a `contentType` field which corresponds to a MIME type.
- `Folder.displayDate` can now be null.

## [0.4.0] - 2022-12-21

### Added

- `Folders` now have a `fileSystemCompatibleName`.
- The `createFolder` function now exists.

### Changed

- The `Record.fileName` attribute has been renamed to `Record.fileSystemCompatibleName`

## [0.3.0] - 2022-08-04

### Added

- `Records` now have `fileName` which has the full filename associated with a record.
- The `getRecord` function, which will return a record associated with an archive.

## [0.2.1] - 2022-08-01

### Fixed

- Record timestamps are now correctly recognized as UTC.
- The `getFolder` function now actually exists.

## [0.2.0] - 2022-07-28

### Added

- The `getArchiveFolders` function, which will return an array of child Folders associated with an archive.
- The `getFolder` function, which will return a folder associated with an archive.

## [0.1.0] - 2022-07-14

### Added

- The `getArchives` function, which will get a list of archives associated with the authorized account.
- The `Archive` type.
- The `ClientConfig` type which allows an sdk user to specify their credentials and other configuration settings.

[Unreleased]: https://github.com/permanentorg/permanent-sdk/base/compare/v0.10.0...HEAD
[0.10.0]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.10.0
[0.6.0]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.6.0
[0.5.4]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.5.4
[0.5.3]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.5.3
[0.5.2]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.5.2
[0.5.1]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.5.1
[0.5.0]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.5.0
[0.4.0]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.4.0
[0.3.0]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.3.0
[0.2.1]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.2.1
[0.2.0]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.2.0
[0.1.0]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.1.0
