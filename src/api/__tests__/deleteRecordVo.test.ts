import nock from 'nock';
import { deleteRecordVo } from '..';

describe('deleteArchiveRecord', () => {
  it('should return true when a record is deleted', async () => {
    nock('https://permanent.local')
      .delete(
        '/api/record/delete?recordId=1',
      )
      .reply(200);

    const result = await deleteRecordVo(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      1,
    );

    expect(result).toBe(true);
  });

  it('should return false when a record is not deleted', async () => {
    nock('https://permanent.local')
      .delete(
        '/api/record/delete?recordId=1',
      )
      .reply(500);

    const result = await deleteRecordVo(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      1,
    );

    expect(result).toBe(false);
  });
});
