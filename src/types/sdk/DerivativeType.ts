import { generateEnumTypeguard } from '../../utils/generateEnumTypeguard';

// These types are defined in the permanent backend:
// https://github.com/PermanentOrg/back-end/blob/main/library/definition/perm.constants.php
export enum DerivativeType {
  Converted = 'file.format.converted',
  FullHd = 'file.format.1920x1080',
  Original = 'file.format.original',
  Unknown = 'UNKNOWN',
}

export const isDerivativeType = generateEnumTypeguard(DerivativeType);
