import { deleteRecordVo } from '../api';
import type {
  ClientConfiguration,
} from '../types';

export const deleteArchiveRecord = async (
  clientConfiguration: ClientConfiguration,
  archiveRecordId: number,
): Promise<boolean> => deleteRecordVo(
  clientConfiguration,
  archiveRecordId,
);
