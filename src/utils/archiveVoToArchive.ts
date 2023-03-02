import type {
  ArchiveVo,
  Archive,
} from '../types';
import { formatTimestampAsUtc } from './formatTimestampAsUtc';

export const archiveVoToArchive = (archiveVo: ArchiveVo): Archive => ({
  id: archiveVo.archiveId,
  slug: archiveVo.archiveNbr,
  name: archiveVo.fullName,
  createdAt: new Date(formatTimestampAsUtc(archiveVo.createdDT)),
  updatedAt: new Date(formatTimestampAsUtc(archiveVo.updatedDT)),
});
