import FormData from 'form-data';
import fetch from 'node-fetch';
import type { Readable } from 'stream';
import type { Response } from 'node-fetch';
import { HttpResponseError } from '../errors';

export const executePresignedPost = async (
  url: string,
  bodyFields: Record<string, unknown>,
  fileData: Buffer | Readable,
  fileSize: number,
): Promise<Response> => {
  const smallerFileSize = fileSize - 4;
  const formData = new FormData();
  Object.keys(bodyFields).forEach((key) => {
    formData.append(key, bodyFields[key]);
  });
  formData.append(
    'file',
    fileData,
    { knownLength: fileSize },
  );
  console.log("DEBUG: what does formData say?");
  console.log(formData);
  const response = await fetch(
      url,
      {
        method: 'POST',
        body: formData,
      },
  );
  if (!response.ok) {
    throw new HttpResponseError(
      response.status,
      await response.text(),
    );
  }
  return response;
};
