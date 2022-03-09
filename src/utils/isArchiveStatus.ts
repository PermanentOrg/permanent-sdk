import { ArchiveStatus } from '../types';
import { generateEnumTypeguard } from './generateEnumTypeguard';

export const isArchiveStatus = generateEnumTypeguard(ArchiveStatus);
