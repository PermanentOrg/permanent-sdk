import nock from 'nock';
import { deleteFolderVo } from '..';

describe('deleteFolderVo', () => {
  it('should return true when a folder is deleted', async () => {
    nock('https://permanent.local')
      .delete(
        '/api/folder/delete?folderId=1',
      )
      .reply(200);

    const result = await deleteFolderVo(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      1,
    );

    expect(result).toBe(true);
  });

  it('should return false when a folder is not deleted', async () => {
    nock('https://permanent.local')
      .delete(
        '/api/folder/delete?folderId=1',
      )
      .reply(500);

    const result = await deleteFolderVo(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      1,
    );

    expect(result).toBe(false);
  });
});
