import { ArchiveType } from '../types';
import { generateEnumTypeguard } from './generateEnumTypeguard';

export const isArchiveType = generateEnumTypeguard(ArchiveType);
