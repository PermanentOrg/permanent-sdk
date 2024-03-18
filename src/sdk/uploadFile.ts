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

export interface UploadFileRequest {
  fileData: Buffer | Readable;
  file: Pick<File, 'contentType' | 'size'>;
  item: Pick<ArchiveRecord, 'displayName' | 'fileSystemCompatibleName'>;
  parentFolder: Pick<Folder, 'id'>;
}

export const uploadFile = async (
  clientConfiguration: ClientConfiguration,
  request: UploadFileRequest,
): Promise<string> => {
  const s3UploadVo = await createS3UploadVo(
    clientConfiguration,
    {
      displayName: request.item.displayName,
      parentFolderId: request.parentFolder.id,
      uploadFileName: request.item.fileSystemCompatibleName,
      fileType: request.file.contentType,
      size: request.file.size,
    },
  );

  await executePresignedPost(
    {
      url: s3UploadVo.presignedPost.url,
      bodyFields: {
        ...s3UploadVo.presignedPost.fields,
        'Content-Type': request.file.contentType,
      },
      fileData: request.fileData,
      fileSize: request.file.size,
    },
  );
  return s3UploadVo.destinationUrl;
};
