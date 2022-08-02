import { formatTimestampAsUtc } from './formatTimestampAsUtc';
import type {
  File,
  FileVo,
} from '../types';
import {
  DerivativeType,
  isDerivativeType,
} from '../types';

const toDerivativeType = (input: string): DerivativeType => (
  isDerivativeType(input) ? input : DerivativeType.Unknown
);

export const fileVoToFile = (fileVo: FileVo): File => ({
  id: fileVo.fileId,
  derivativeType: toDerivativeType(fileVo.format),
  fileUrl: fileVo.fileURL,
  downloadUrl: fileVo.downloadURL,
  checksum: fileVo.md5Checksum,
  size: fileVo.size,
  createdAt: new Date(formatTimestampAsUtc(fileVo.createdDT)),
  updatedAt: new Date(formatTimestampAsUtc(fileVo.updatedDT)),
});