# @permanentorg/sdk
This project is a TypeScript SDK for interfacing with Permanent.org's API.

You can view [the project's changelog](CHANGELOG.md) to learn more about our releases.

## Code

The project is organized as follows:

```
- docs // Contains documentation related to the project
- src  // Contains all project code
| - sdk   // The core / exposed functionality of the SDK
| - utils.ts
| - types.ts
| - index.ts // project root, exports the full contents of /sdk and the externally needed types from types.js
```

## Contributing

Contributors to this repository agree to adhere to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). To report violations, get in touch with engineers@permanent.org.

The version of NodeJS used for development is specified in `.node-version` located at the project root.

Be sure to include updates to the [changelog](CHANGELOG.md) as part of any contribution.

## Security

Found a vulnerability? Report this and any other security concerns to engineers@permanent.org.

## License

This code is free and open source software licensed under the [MIT](LICENSE) License.
