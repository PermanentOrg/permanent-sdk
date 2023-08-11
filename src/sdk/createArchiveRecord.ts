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

export const createArchiveRecord = async (
  clientConfiguration: ClientConfiguration,
  s3Url: string,
  file: Pick<File, 'contentType' | 'size'>,
  item: Pick<ArchiveRecord, 'displayName' | 'fileSystemCompatibleName'>,
  parentFolder: Pick<Folder, 'id'>,
): Promise<ArchiveRecord> => {
  const recordVo = await createRecordVo(
    clientConfiguration,
    s3Url,
    item.displayName,
    parentFolder.id,
    item.fileSystemCompatibleName,
    file.contentType,
    file.size,
  );
  return recordVoToArchiveRecord(recordVo);
};
