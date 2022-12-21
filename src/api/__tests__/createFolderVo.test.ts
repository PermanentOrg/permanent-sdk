import nock from 'nock';
import { createFolderVo } from '..';
import { ValidationError } from '../../errors';

describe('createFolderVo', () => {
  it('should create a folder', async () => {
    nock('https://permanent.local')
      .post(
        '/api/folder/post',
        {
          displayName: 'testFolder',
          parentFolderId: 1,
        },
      )
      .replyWithFile(
        200,
        `${__dirname}/fixtures/createFolderVo/folder.json`,
        {
          'Content-Type': 'application/json',
        },
      );

    const folderVo = await createFolderVo(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      {
        name: 'testFolder',
      },
      {
        id: 1,
      },
    );

    expect(folderVo).toMatchSnapshot();
  });

  it('should error when provided an invalid response', async () => {
    nock('https://permanent.local')
      .post(
        '/api/folder/post',
        {
          displayName: 'testFolder',
          parentFolderId: 1,
        },
      )
      .reply(
        200,
        '["Not at all a folderVo"]',
        {
          'Content-Type': 'application/json',
        },
      );

    await expect(createFolderVo(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      {
        name: 'testFolder',
      },
      {
        id: 1,
      },
    )).rejects.toBeInstanceOf(ValidationError);
  });
});
