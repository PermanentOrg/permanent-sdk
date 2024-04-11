import {
  createRecordVo,
} from '../api';
import {
  recordVoToArchiveRecord,
} from '../utils';
import type {
  ArchiveRecord,
  File,
  ClientConfiguration,
  Folder,
} from '../types';

export interface CreateArchiveRecordParams {
  s3Url: string;
  file: Pick<File, 'contentType' | 'size'>;
  item: Pick<ArchiveRecord, 'displayName' | 'fileSystemCompatibleName'>;
  parentFolder: Pick<Folder, 'id'>;
}

export const createArchiveRecord = async (
  clientConfiguration: ClientConfiguration,
  params: CreateArchiveRecordParams,
): Promise<ArchiveRecord> => {
  const recordVo = await createRecordVo(
    clientConfiguration,
    params.s3Url,
    params.item.displayName,
    params.parentFolder.id,
    params.item.fileSystemCompatibleName,
    params.file.contentType,
    params.file.size,
  );
  return recordVoToArchiveRecord(recordVo);
};
