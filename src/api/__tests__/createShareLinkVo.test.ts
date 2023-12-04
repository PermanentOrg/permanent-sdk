import nock from 'nock';
import { createShareLinkVo } from '..';

describe('createShareLink', () => {
  test('should create a share link', async () => {
    nock('https://permanent.local')
      .post(
        '/api/share/generateShareLink',
        {
          folderLinkId: 8306,
          maxUses: 0,
          previewToggle: false,
          defaultAccessRole: 'access.role.viewer',
        },
      )
      .replyWithFile(
        200,
        `${__dirname}/fixtures/createShareLink/shareLinkVo.json`,
        { 'Content-Type': 'application/json' },
      );

    const shareLinkVo = await createShareLinkVo(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      {
        folderLinkId: 8306,
        maxUses: 0,
        previewToggle: false,
        defaultAccessRole: 'access.role.viewer',
      },
    );

    expect(shareLinkVo).toMatchSnapshot();
  });
});
