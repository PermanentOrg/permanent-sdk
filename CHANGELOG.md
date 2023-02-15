# Changelog for @permanentorg/sdk

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/permanentorg/permanent-sdk/base/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.4.0
[0.3.0]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.3.0
[0.2.1]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.2.1
[0.2.0]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.2.0
[0.1.0]: https://github.com/permanentorg/permanent-sdk/base/releases/tag/v0.1.0
