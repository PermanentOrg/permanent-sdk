import { getAllArchiveVos } from '../api';
import { archiveVoToArchive } from '../utils';
import type {
  Archive,
  ClientConfiguration,
} from '../types';

export const getArchives = async (clientConfiguration: ClientConfiguration): Promise<Archive[]> => {
  const archiveVos = await getAllArchiveVos(clientConfiguration);
  const archives = archiveVos.map(archiveVoToArchive);
  return archives;
};
