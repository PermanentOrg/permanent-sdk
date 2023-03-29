import type {
  ClientConfiguration,
} from '../types';
import { deleteFolderVo } from '../api';

export const deleteFolder = async (
  clientConfiguration: ClientConfiguration,
  folderId: number,
): Promise<boolean> => deleteFolderVo(
  clientConfiguration,
  folderId,
);
