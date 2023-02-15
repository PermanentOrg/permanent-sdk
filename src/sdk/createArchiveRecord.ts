import type { Readable } from 'stream';
import type {
  ArchiveRecord,
  File,
  ClientConfiguration,
  Folder,
} from '../types';
import {
  createS3UploadVo,
  createRecordVo,
} from '../api';
import {
  recordVoToArchiveRecord,
  executePresignedPost,
} from '../utils';

export const createArchiveRecord = async (
  clientConfiguration: ClientConfiguration,
  fileData: Buffer | Readable,
  file: Pick<File, 'contentType' | 'size'>,
  item: Pick<ArchiveRecord, 'displayName' | 'fileSystemCompatibleName'>,
  parentFolder: Pick<Folder, 'id'>,
): Promise<ArchiveRecord> => {
  const s3UploadVo = await createS3UploadVo(
    clientConfiguration,
    item.displayName,
    parentFolder.id,
    item.fileSystemCompatibleName,
    file.contentType,
    file.size,
  );

  await executePresignedPost(
    s3UploadVo.presignedPost.url,
    {
      ...s3UploadVo.presignedPost.fields,
      'Content-Type': file.contentType,
    },
    fileData,
    file.size,
  );

  const recordVo = await createRecordVo(
    clientConfiguration,
    s3UploadVo.destinationUrl,
    item.displayName,
    parentFolder.id,
    item.fileSystemCompatibleName,
    file.contentType,
    file.size,
  );
  return recordVoToArchiveRecord(recordVo);
};
