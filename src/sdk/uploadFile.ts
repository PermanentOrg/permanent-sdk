import {
  createS3UploadVo,
} from '../api';
import {
  executePresignedPost,
} from '../utils';
import type { Readable } from 'stream';
import type {
  ArchiveRecord,
  File,
  ClientConfiguration,
  Folder,
} from '../types';

export const uploadFile = async (
  clientConfiguration: ClientConfiguration,
  fileData: Buffer | Readable,
  file: Pick<File, 'contentType' | 'size'>,
  item: Pick<ArchiveRecord, 'displayName' | 'fileSystemCompatibleName'>,
  parentFolder: Pick<Folder, 'id'>,
): Promise<string> => {
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
  return s3UploadVo.destinationUrl;
};
