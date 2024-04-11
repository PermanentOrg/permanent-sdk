import nock from 'nock';
import { getArchiveFolders } from '..';

describe('getArchiveFolders', () => {
  it('should return an array of folders', async () => {
    nock('https://permanent.local')
      .get('/api/folder/getRoot')
      .query({
        archiveId: 1,
      })
      .replyWithFile(
        200,
        `${__dirname}/fixtures/getArchiveFolders/archiveRoot.json`,
        {
          'Content-Type': 'application/json',
        },
      );

    const archives = await getArchiveFolders(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      {
        archiveId: 1,
      },
    );

    expect(archives).toMatchSnapshot();
  });
});
