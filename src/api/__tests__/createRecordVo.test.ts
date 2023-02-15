import nock from 'nock';
import { createRecordVo } from '..';
import { ValidationError } from '../../errors';

describe('createRecordVo', () => {
  it('should create a record', async () => {
    nock('https://permanent.local')
      .post(
        '/api/record/registerRecord',
        {
          s3url: 'exampleUrl',
          displayName: 'testFile',
          parentFolderId: 1,
          uploadFileName: 'testFile.txt',
          fileType: 'text/plain',
          size: 12,
        },
      )
      .replyWithFile(
        200,
        `${__dirname}/fixtures/createRecordVo/recordVo.json`,
        {
          'Content-Type': 'application/json',
        },
      );

    const recordVo = await createRecordVo(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      'exampleUrl',
      'testFile',
      1,
      'testFile.txt',
      'text/plain',
      12,
    );

    expect(recordVo).toMatchSnapshot();
  });

  it('should error when provided an invalid response', async () => {
    nock('https://permanent.local')
      .post(
        '/api/record/registerRecord',
        {
          s3url: 'exampleUrl',
          displayName: 'testFile',
          parentFolderId: 1,
          uploadFileName: 'testFile.txt',
          fileType: 'text/plain',
          size: 12,
        },
      )
      .reply(
        200,
        '["Not at all a s3UploadVo"]',
        {
          'Content-Type': 'application/json',
        },
      );

    await expect(createRecordVo(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      'exampleUrl',
      'testFile',
      1,
      'testFile.txt',
      'text/plain',
      12,
    )).rejects.toBeInstanceOf(ValidationError);
  });
});
