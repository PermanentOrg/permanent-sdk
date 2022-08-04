import type {
  Record,
  ClientConfiguration,
} from '../types';
import { getRecordVo } from '../api';
import { recordVoToRecord } from '../utils';

export const getRecord = async (
  clientConfiguration: ClientConfiguration,
  recordId: number,
  archiveId: number,
): Promise<Record> => recordVoToRecord(
  await getRecordVo(
    clientConfiguration,
    recordId,
    archiveId,
  ),
);
