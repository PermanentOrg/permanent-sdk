import { deleteFolderVo } from '../api';
import type {
  ClientConfiguration,
} from '../types';

export const deleteFolder = async (
  clientConfiguration: ClientConfiguration,
  folderId: number,
): Promise<boolean> => deleteFolderVo(
  clientConfiguration,
  folderId,
);
