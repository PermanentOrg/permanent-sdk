import nock from 'nock';
import { updateShareLinkVo } from '..';

describe('updateShareLinkVo', () => {
  test('should update share link', async () => {
    nock('https://permanent.local')
      .post(
        '/api/share/updateShareLink',
        {
          shareByUrlId: 1,
          maxUses: 10,
          previewToggle: true,
          autoApproveToggle: true,
          defaultAccessRole: 'access.role.editor',
          expiresDT: '2022-01-01T00:00:00Z',
        },
      )
      .replyWithFile(
        200,
        `${__dirname}/fixtures/updateShareLinkVo/shareLinkVo.json`,
        { 'Content-Type': 'application/json' },
      );

    const shareLinkVo = await updateShareLinkVo(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      {
        shareByUrlId: 1,
        maxUses: 10,
        previewToggle: true,
        autoApproveToggle: true,
        defaultAccessRole: 'access.role.editor',
        expiresDT: '2022-01-01T00:00:00Z',
      },
    );

    expect(shareLinkVo).toMatchSnapshot();
  });
});
