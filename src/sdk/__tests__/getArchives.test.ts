import nock from 'nock';
import { getArchives } from '..';

describe('getArchives', () => {
  it('should return an array of archive VOs', async () => {
    nock('https://permanent.local')
      .get('/api/archive/getAllArchives')
      .replyWithFile(
        200,
        `${__dirname}/replies/getArchives/multipleArchives.json`,
        {
          'Content-Type': 'application/json',
        },
      );

    const archives = await getArchives({
      bearerToken: '12345',
      baseUrl: 'https://permanent.local/api',
    });

    expect(archives).toMatchSnapshot();
  });
});
