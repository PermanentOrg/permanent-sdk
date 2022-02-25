import type {
  Archive,
  ArchiveVo,
} from '../types';
import { getAllArchiveVos } from '../api';
import { convertArchiveVosToArchives } from '../utils';

export function getArchives(authentication: string): Archive[] {
  const archiveVos = getAllArchiveVos(authentication);
  const archives = convertArchiveVosToArchives(archiveVos);
  return archives;
}
