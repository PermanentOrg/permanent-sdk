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

export interface CreateArchiveRecordRequest {
  s3Url: string;
  file: Pick<File, 'contentType' | 'size'>;
  item: Pick<ArchiveRecord, 'displayName' | 'fileSystemCompatibleName'>;
  parentFolder: Pick<Folder, 'id'>;
}

export const createArchiveRecord = async (
  clientConfiguration: ClientConfiguration,
  request: CreateArchiveRecordRequest,
): Promise<ArchiveRecord> => {
  const recordVo = await createRecordVo(
    clientConfiguration,
    {
      s3Url: request.s3Url,
      displayName: request.item.displayName,
      parentFolderId: request.parentFolder.id,
      uploadFileName: request.item.fileSystemCompatibleName,
      fileType: request.file.contentType,
      size: request.file.size,
    },
  );
  return recordVoToArchiveRecord(recordVo);
};
