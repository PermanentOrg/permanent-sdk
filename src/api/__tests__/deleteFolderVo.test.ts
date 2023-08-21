import nock from 'nock';
import { deleteFolderVo } from '..';
import { HttpResponseError } from '../../errors';

describe('deleteFolderVo', () => {
  it('should not throw when a folder is deleted', async () => {
    nock('https://permanent.local')
      .delete(
        '/api/folder/delete?folderId=1',
      )
      .reply(200);

    await expect(deleteFolderVo(
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
        '/api/folder/delete?folderId=1',
      )
      .reply(500);

    await expect(deleteFolderVo(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      1,
    )).rejects.toThrow(HttpResponseError);
  });
});
