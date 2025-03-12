import {
  DerivativeType,
  isDerivativeType,
} from '../types';
import { formatTimestampAsUtc } from './formatTimestampAsUtc';
import type {
  File,
  StelaFile,
} from '../types';

const toDerivativeType = (input: string): DerivativeType => (
  isDerivativeType(input) ? input : DerivativeType.Unknown
);

export const stelaFileToFile = (stelaFile: StelaFile): File => ({
  id: stelaFile.fileId,
  derivativeType: toDerivativeType(stelaFile.format),
  contentType: stelaFile.type,
  fileUrl: stelaFile.fileUrl,
  downloadUrl: stelaFile.downloadUrl,
  checksum: '',
  size: stelaFile.size,
  createdAt: new Date(formatTimestampAsUtc(stelaFile.createdAt)),
  updatedAt: new Date(formatTimestampAsUtc(stelaFile.updatedAt)),
});
