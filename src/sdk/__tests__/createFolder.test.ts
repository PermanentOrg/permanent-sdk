import nock from 'nock';
import { createFolder } from '..';

describe('createFolder', () => {
  it('should create a folder', async () => {
    nock('https://permanent.local')
      .post(
        '/api/folder/post',
        {
          displayName: 'testFolder',
          parentFolderId: 1,
        },
      )
      .replyWithFile(
        200,
        `${__dirname}/fixtures/createFolder/folder.json`,
        {
          'Content-Type': 'application/json',
        },
      );

    const folder = await createFolder(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      {
        name: 'testFolder',
      },
      {
        id: 1,
      },
    );

    expect(folder).toMatchSnapshot();
  });
});
