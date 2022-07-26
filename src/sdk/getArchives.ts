import type {
  Archive,
  ClientConfiguration,
} from '../types';
import { getAllArchiveVos } from '../api';
import { archiveVoToArchive } from '../utils';

export const getArchives = async (clientConfiguration: ClientConfiguration): Promise<Archive[]> => {
  const archiveVos = await getAllArchiveVos(clientConfiguration);
  const archives = archiveVos.map(archiveVoToArchive);
  return archives;
};
