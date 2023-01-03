import nock from 'nock';
import { getArchiveRecord } from '..';

describe('getArchiveRecord', () => {
  it('should return a Record', async () => {
    nock('https://permanent.local')
      .get('/api/record/get')
      .query({
        recordId: 512,
        archiveId: 1,
      })
      .replyWithFile(
        200,
        `${__dirname}/fixtures/getRecord/recordVo.json`,
        {
          'Content-Type': 'application/json',
        },
      );

    const folder = await getArchiveRecord(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      512,
      1,
    );

    expect(folder).toMatchSnapshot();
  });
});
