import { getRecordVo } from '../api';
import { recordVoToArchiveRecord } from '../utils';
import type {
  ArchiveRecord,
  ClientConfiguration,
} from '../types';

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
