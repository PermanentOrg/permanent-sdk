import nock from 'nock';
import { getFolder } from '..';

describe('getFolder', () => {
  it('should return a Folder', async () => {
    nock('https://permanent.local')
      .get('/api/folder/getWithChildren')
      .query({
        folderId: 7457,
        archiveId: 1,
      })
      .replyWithFile(
        200,
        `${__dirname}/fixtures/getFolder/folder.json`,
        {
          'Content-Type': 'application/json',
        },
      );

    const folder = await getFolder(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      {
        folderId: 7457,
        archiveId: 1,
      },
    );

    expect(folder).toMatchSnapshot();
  });

  it('should return a Folder when DisplayDT is null', async () => {
    nock('https://permanent.local')
      .get('/api/folder/getWithChildren')
      .query({
        folderId: 7457,
        archiveId: 1,
      })
      .replyWithFile(
        200,
        `${__dirname}/fixtures/getFolder/folderWithNullDisplayDt.json`,
        {
          'Content-Type': 'application/json',
        },
      );

    const folder = await getFolder(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      {
        folderId: 7457,
        archiveId: 1,
      },
    );

    expect(folder).toMatchSnapshot();
  });
});
