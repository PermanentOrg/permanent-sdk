import { getRecordVo } from '../api';
import { recordVoToArchiveRecord } from '../utils';
import type {
  ArchiveRecord,
  ClientConfiguration,
} from '../types';

export interface GetArchiveRecordParams {
  archiveRecordId: number;
  archiveId: number;
}

export const getArchiveRecord = async (
  clientConfiguration: ClientConfiguration,
  params: GetArchiveRecordParams,
): Promise<ArchiveRecord> => recordVoToArchiveRecord(
  await getRecordVo(
    clientConfiguration,
    params.archiveRecordId,
    params.archiveId,
  ),
);
