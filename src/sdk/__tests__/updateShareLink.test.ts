import nock from 'nock';
import { updateShareLink } from '..';
import { AccessRole, Status } from '../../types';

describe('updateShareLink', () => {
  test('should update the share link', async () => {
    nock('https://permanent.local')
      .post(
        '/api/share/updateShareLink',
        {
          shareByUrlId: 1,
          maxUses: 10,
          previewToggle: false,
          autoApproveToggle: true,
          defaultAccessRole: 'access.role.editor',
          expiresDT: '2022-01-01T00:00:00.000Z',
        },
      )
      .replyWithFile(
        200,
        `${__dirname}/fixtures/updateShareLink/shareLinkVo.json`,
        { 'Content-Type': 'application/json' },
      );

    const shareLink = await updateShareLink(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      {
        id: 1,
        sharedFileSystemItemId: 1,
        status: Status.Ok,
        byAccountId: 1,
        url: 'https://permanent.local/share/1',
        urlToken: '1',
        maxUses: 10,
        showPreview: false,
        autoApprove: true,
        defaultAccessRole: AccessRole.Editor,
        expiresAt: new Date('2022-01-01T00:00:00Z'),
        createdAt: new Date('2021-01-01T00:00:00Z'),
        updatedAt: new Date('2021-01-01T00:00:00Z'),
      },
    );

    expect(shareLink).toMatchSnapshot();
  });
});
