import nock from 'nock';
import { deleteRecordVo } from '..';
import { HttpResponseError } from '../../errors';

describe('deleteArchiveRecord', () => {
  it('should not throw when a record is deleted', async () => {
    nock('https://permanent.local')
      .delete(
        '/api/record/delete?recordId=1',
      )
      .reply(200);

    await expect(deleteRecordVo(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      1,
    )).resolves.not.toThrow();
  });

  it('should throw an error when when a 500 status is returned', async () => {
    nock('https://permanent.local')
      .delete(
        '/api/record/delete?recordId=1',
      )
      .reply(500);

    await expect(deleteRecordVo(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      1,
    )).rejects.toThrow(HttpResponseError);
  });
});
