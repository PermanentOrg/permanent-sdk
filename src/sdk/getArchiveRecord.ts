import type {
  ArchiveRecord,
  ClientConfiguration,
} from '../types';
import { getRecordVo } from '../api';
import { recordVoToArchiveRecord } from '../utils';

export const getArchiveRecord = async (
  clientConfiguration: ClientConfiguration,
  archiveRecordId: number,
  archiveId: number,
): Promise<ArchiveRecord> => recordVoToArchiveRecord(
  await getRecordVo(
    clientConfiguration,
    archiveRecordId,
    archiveId,
  ),
);
