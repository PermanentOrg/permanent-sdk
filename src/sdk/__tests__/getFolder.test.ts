import nock from 'nock';
import { getFolder } from '..';

describe('getFolder', () => {
  it('should return a Folder', async () => {
    const folderPage = nock('https://api.permanent.local')
      .get('/api/v2/folder')
      .query({
        'folderIds[]': '7457',
      })
      .replyWithFile(
        200,
        `${__dirname}/fixtures/getFolder/stelaFolder.json`,
        {
          'Content-Type': 'application/json',
        },
      );

    const firstChildrenPage = nock('https://api.permanent.local')
      .get('/api/v2/folder/7457/children')
      .query({
        pageSize: 20,
      })
      .replyWithFile(
        200,
        `${__dirname}/fixtures/getFolder/stelaChildrenPageOne.json`,
        {
          'Content-Type': 'application/json',
        },
      );

    const secondChildrenPage = nock('https://api.permanent.local')
      .get('/api/v2/folder/7457/children')
      .query({
        pageSize: 20,
        cursor: '1575064',
      })
      .replyWithFile(
        200,
        `${__dirname}/fixtures/getFolder/stelaChildrenPageTwo.json`,
        {
          'Content-Type': 'application/json',
        },
      );

    const folder = await getFolder(
      {
        bearerToken: '12345',
        stelaBaseUrl: 'https://api.permanent.local/api/v2',
      },
      {
        folderId: 7457,
      },
    );

    expect(folderPage.isDone()).toBe(true);
    expect(firstChildrenPage.isDone()).toBe(true);
    expect(secondChildrenPage.isDone()).toBe(true);
    expect(folder).toMatchSnapshot();
  });

  it('should throw an error if stela does not return the folder', async () => {
    const folderPage = nock('https://api.permanent.local')
      .get('/api/v2/folder')
      .query({
        'folderIds[]': '7457',
      })
      .replyWithFile(
        200,
        `${__dirname}/fixtures/getFolder/stelaNoFolder.json`,
        {
          'Content-Type': 'application/json',
        },
      );

    const call = getFolder(
      {
        bearerToken: '12345',
        stelaBaseUrl: 'https://api.permanent.local/api/v2',
      },
      {
        folderId: 7457,
      },
    );
    await expect(call).rejects.toThrow();
    expect(folderPage.isDone()).toBe(true);
  });
});
