import { isS3UploadVo } from '../types';
import {
  makePermanentApiCall,
  typedJsonParse,
} from '../utils';
import type {
  ClientConfiguration,
  S3UploadVo,
} from '../types';

export const createS3UploadVo = async (
  clientConfiguration: ClientConfiguration,
  displayName: string,
  parentFolderId: number,
  uploadFileName: string,
  fileType: string,
  size: number,
): Promise<S3UploadVo> => {
  const body = JSON.stringify({
    displayName,
    parentFolderId,
    uploadFileName,
    fileType,
    size,
  });
  const response = await makePermanentApiCall(
    clientConfiguration,
    '/record/getPresignedUrl',
    {
      method: 'POST',
      body,
    },
  );
  const responseText = await response.text();
  return typedJsonParse(responseText, isS3UploadVo);
};
