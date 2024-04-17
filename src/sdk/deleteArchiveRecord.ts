import { deleteRecordVo } from '../api';
import type {
  ClientConfiguration,
} from '../types';

export interface DeleteArchiveRecordParams {
  archiveRecordId: number;
}

export const deleteArchiveRecord = async (
  clientConfiguration: ClientConfiguration,
  params: DeleteArchiveRecordParams,
): Promise<void> => deleteRecordVo(
  clientConfiguration,
  params.archiveRecordId,
);
