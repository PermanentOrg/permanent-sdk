import { isRecordVo } from '../types';
import {
  makePermanentApiCall,
  typedJsonParse,
} from '../utils';
import type {
  ClientConfiguration,
  RecordVo,
} from '../types';

export const createRecordVo = async (
  clientConfiguration: ClientConfiguration,
  s3Url: string,
  displayName: string,
  parentFolderId: number,
  uploadFileName: string,
  fileType: string,
  size: number,
): Promise<RecordVo> => {
  const body = JSON.stringify({
    s3url: s3Url,
    displayName,
    parentFolderId,
    uploadFileName,
    fileType,
    size,
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
