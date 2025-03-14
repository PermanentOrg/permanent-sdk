import {
  DerivativeType,
  isDerivativeType,
} from '../types';
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
  createdAt: new Date(stelaFile.createdAt),
  updatedAt: new Date(stelaFile.updatedAt),
});
