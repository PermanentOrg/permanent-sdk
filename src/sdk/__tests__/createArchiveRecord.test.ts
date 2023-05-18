import nock from 'nock';
import fs from 'fs';
import { createArchiveRecord } from '..';

describe('createArchiveRecord', () => {
  it('should create an ArchiveRecord', async () => {
    const filePath = `${__dirname}/fixtures/createArchiveRecord/myFile.txt`;
    const { size: fileSize } = fs.statSync(filePath);

    nock('https://permanent.local')
      .post(
        '/api/record/registerRecord',
        {
          s3url: 'https://permanet.local/_slifty/unprocessed/12345678-e6ef-4238-85d3-20001abebb63',
          displayName: 'myFile',
          parentFolderId: 1,
          uploadFileName: 'myFile.txt',
          fileType: 'text/plain',
          size: fileSize,
        },
      )
      .replyWithFile(
        200,
        `${__dirname}/fixtures/createArchiveRecord/recordVo.json`,
        {
          'Content-Type': 'application/json',
        },
      );

    const archiveRecord = await createArchiveRecord(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      'https://permanet.local/_slifty/unprocessed/12345678-e6ef-4238-85d3-20001abebb63',
      {
        size: fileSize,
        contentType: 'text/plain',
      },
      {
        displayName: 'myFile',
        fileSystemCompatibleName: 'myFile.txt',
      },
      {
        id: 1,
      },
    );

    expect(archiveRecord).toMatchSnapshot();
  });
});
