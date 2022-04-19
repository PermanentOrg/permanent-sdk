import type {
  Archive,
  ArchiveVo,
} from '../types';
import { getAllArchiveVos } from '../api';
import { archiveVoToArchive } from '../utils';

export async function getArchives(authentication: string): Promise<Archive[]> {
  const archiveVos = await getAllArchiveVos(authentication);
  const archives = archiveVos.map(archiveVoToArchive);
  return archives;
}
