import nock from 'nock';
import { deleteFolder } from '..';
import { HttpResponseError } from '../../errors/HttpResponseError';

describe('deleteFolder', () => {
  it('should not throw when a folder is deleted', async () => {
    nock('https://permanent.local')
      .delete(
        '/api/folder/delete?folderId=1',
      )
      .reply(200);

    await expect(deleteFolder(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      {
        folderId: 1,
      },
    )).resolves.not.toThrow();
  });

  it('should throw an error when receiving a 500 response', async () => {
    nock('https://permanent.local')
      .delete(
        '/api/folder/delete?folderId=1',
      )
      .reply(500);

    await expect(deleteFolder(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      {
        folderId: 1,
      },
    )).rejects.toThrow(HttpResponseError);
  });
});
