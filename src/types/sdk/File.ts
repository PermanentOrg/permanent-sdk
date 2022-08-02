import type { DerivativeType } from './DerivativeType';

export interface File {
  id: number;
  derivativeType: DerivativeType;
  fileUrl: string;
  downloadUrl: string;
  checksum: string;
  size: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
