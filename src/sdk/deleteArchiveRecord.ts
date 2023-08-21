import { deleteRecordVo } from '../api';
import type {
  ClientConfiguration,
} from '../types';

export const deleteArchiveRecord = async (
  clientConfiguration: ClientConfiguration,
  archiveRecordId: number,
): Promise<void> => deleteRecordVo(
  clientConfiguration,
  archiveRecordId,
);
