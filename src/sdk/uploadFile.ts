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

export interface UploadFileParams {
  fileData: Buffer | Readable;
  file: Pick<File, 'contentType' | 'size'>;
  item: Pick<ArchiveRecord, 'displayName' | 'fileSystemCompatibleName'>;
  parentFolder: Pick<Folder, 'id'>;
}

export const uploadFile = async (
  clientConfiguration: ClientConfiguration,
  params: UploadFileParams,
): Promise<string> => {
  const s3UploadVo = await createS3UploadVo(
    clientConfiguration,
    params.item.displayName,
    params.parentFolder.id,
    params.item.fileSystemCompatibleName,
    params.file.contentType,
    params.file.size,
  );

  await executePresignedPost(
    s3UploadVo.presignedPost.url,
    {
      ...s3UploadVo.presignedPost.fields,
      'Content-Type': params.file.contentType,
    },
    params.fileData,
    params.file.size,
  );
  return s3UploadVo.destinationUrl;
};
