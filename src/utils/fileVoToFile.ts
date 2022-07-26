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
  fileUrl: fileVo.fileUrl,
  downloadUrl: fileVo.downloadUrl,
  checksum: fileVo.checksum,
  createdAt: new Date(fileVo.createdDT),
  updatedAt: new Date(fileVo.updatedDT),
});
