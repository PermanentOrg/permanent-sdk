import type {
  ClientConfiguration,
} from '../types';
import { deleteRecordVo } from '../api';

export const deleteArchiveRecord = async (
  clientConfiguration: ClientConfiguration,
  archiveRecordId: number,
): Promise<boolean> => deleteRecordVo(
  clientConfiguration,
  archiveRecordId,
);
