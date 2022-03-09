import { AccessRole } from '../types';
import { generateEnumTypeguard } from './generateEnumTypeguard';

export const isAccessRole = generateEnumTypeguard(AccessRole);
