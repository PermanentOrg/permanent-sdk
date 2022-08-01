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
      7457,
      1,
    );

    expect(folder).toMatchSnapshot();
  });
});
