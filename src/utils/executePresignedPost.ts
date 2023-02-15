import fetch from 'node-fetch';
import FormData from 'form-data';
import type { Readable } from 'stream';
import type { Response } from 'node-fetch';

export const executePresignedPost = async (
  url: string,
  bodyFields: Record<string, unknown>,
  fileData: Buffer | Readable,
  fileSize: number,
): Promise<Response> => {
  const formData = new FormData();
  Object.keys(bodyFields).forEach((key) => {
    formData.append(key, bodyFields[key]);
  });
  formData.append(
    'file',
    fileData,
    { knownLength: fileSize },
  );
  return fetch(
    url,
    {
      method: 'POST',
      body: formData,
    },
  );
};
