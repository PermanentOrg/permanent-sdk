import { formatTimestampAsUtc } from './formatTimestampAsUtc';
import type {
  ArchiveVo,
  Archive,
} from '../types';

export const archiveVoToArchive = (archiveVo: ArchiveVo): Archive => ({
  id: archiveVo.archiveId,
  slug: archiveVo.archiveNbr,
  name: archiveVo.fullName,
  createdAt: new Date(formatTimestampAsUtc(archiveVo.createdDT)),
  updatedAt: new Date(formatTimestampAsUtc(archiveVo.updatedDT)),
});
