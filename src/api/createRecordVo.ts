import { isRecordVo } from '../types';
import {
  makePermanentApiCall,
  typedJsonParse,
} from '../utils';
import type {
  ClientConfiguration,
  RecordVo,
} from '../types';

export interface CreateRecordVoRequest {
  s3Url: string;
  displayName: string;
  parentFolderId: number;
  uploadFileName: string;
  fileType: string;
  size: number;
}

export const createRecordVo = async (
  clientConfiguration: ClientConfiguration,
  request: CreateRecordVoRequest,
): Promise<RecordVo> => {
  const body = JSON.stringify({
    s3url: request.s3Url,
    displayName: request.displayName,
    parentFolderId: request.parentFolderId,
    uploadFileName: request.uploadFileName,
    fileType: request.fileType,
    size: request.size,
  });

  const response = await makePermanentApiCall(
    clientConfiguration,
    '/record/registerRecord',
    {
      method: 'POST',
      body,
    },
  );
  const responseText = await response.text();
  return typedJsonParse(responseText, isRecordVo);
};
