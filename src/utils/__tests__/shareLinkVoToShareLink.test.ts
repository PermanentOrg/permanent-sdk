import { shareLinkVoToShareLink } from '..';
import { AccessRole, Status } from '../../types';

describe('shareLinkVoToShareLink', () => {
  test('should populate the share link from the VO', () => {
    const shareLinkVo = {
      shareby_urlId: 42,
      folder_linkId: 42,
      byAccountId: 101,
      byArchiveId: 102,
      shareUrl: 'https://permanent.org/share/example-path',
      urlToken: 'example-path',
      uses: 0,
      maxUses: 10,
      autoApproveToggle: 0,
      previewToggle: 1,
      defaultAccessRole: AccessRole.Editor,
      status: Status.Ok,
      createdDT: '2021-08-25T15:00:00Z',
      updatedDT: '2021-08-25T15:00:00Z',
      expiresDT: '2021-10-25T15:00:00Z',
    };

    const shareLink = shareLinkVoToShareLink(shareLinkVo);
    expect(shareLink).toEqual({
      id: 42,
      sharedFileSystemItemId: 42,
      url: 'https://permanent.org/share/example-path',
      urlToken: 'example-path',
      byAccountId: 101,
      uses: 0,
      maxUses: 10,
      autoApprove: false,
      showPreview: true,
      defaultAccessRole: AccessRole.Editor,
      status: Status.Ok,
      createdAt: new Date('2021-08-25T15:00:00Z'),
      updatedAt: new Date('2021-08-25T15:00:00Z'),
      expiresAt: new Date('2021-10-25T15:00:00Z'),
    });
  });

  test('should handle undefined values correctly', () => {
    const shareLinkVo = {
      shareby_urlId: 42,
      folder_linkId: 42,
      byAccountId: 101,
      byArchiveId: 102,
      shareUrl: 'https://permanent.org/share/example-path',
      urlToken: 'example-path',
      status: Status.Ok,
      createdDT: '2021-08-25T15:00:00Z',
      updatedDT: '2021-08-25T15:00:00Z',
    };

    const shareLink = shareLinkVoToShareLink(shareLinkVo);
    expect(shareLink).toEqual({
      id: 42,
      sharedFileSystemItemId: 42,
      url: 'https://permanent.org/share/example-path',
      urlToken: 'example-path',
      byAccountId: 101,
      uses: undefined,
      maxUses: undefined,
      autoApprove: false,
      showPreview: false,
      defaultAccessRole: undefined,
      status: Status.Ok,
      createdAt: new Date('2021-08-25T15:00:00Z'),
      updatedAt: new Date('2021-08-25T15:00:00Z'),
      expiresAt: undefined,
    });
  });
});
