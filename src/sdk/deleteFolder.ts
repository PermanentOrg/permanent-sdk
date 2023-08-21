import { deleteFolderVo } from '../api';
import type {
  ClientConfiguration,
} from '../types';

export const deleteFolder = async (
  clientConfiguration: ClientConfiguration,
  folderId: number,
): Promise<void> => deleteFolderVo(
  clientConfiguration,
  folderId,
);
