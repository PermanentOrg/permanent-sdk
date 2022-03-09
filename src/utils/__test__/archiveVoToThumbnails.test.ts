import type {
  Thumbnail,
} from '../../types';
import {
  ThumbnailStatus,
  defaultArchiveVo,
} from '../../types';
import {
  archiveVoToThumbnails,
} from '../';

describe('archiveVoToThumbnails', () => {
  it('should convert all thumbnails if present', () => {
    const thumbnailStatus = 'status.generic.ok';
    const thumbnailCreatedAt = new Date('11 Feb 2022 12:34:56 GMT');
    const archiveVo = {
      ...defaultArchiveVo,
      thumbDT: thumbnailCreatedAt.toISOString(),
      thumbStatus: thumbnailStatus,
      thumbURL1000: 'example.com/1000',
      thumbURL200: 'example.com/200',
      thumbURL2000: 'example.com/2000',
      thumbURL500: 'example.com/500',
    };
    const thumbnails = archiveVoToThumbnails(archiveVo);
    expect(thumbnails.length).toBe(4);
    thumbnails.forEach((thumbnail: Thumbnail) => {
      expect(thumbnail.status).toEqual(thumbnailStatus);
      expect(thumbnail.createdAt).toEqual(thumbnailCreatedAt);

      // Note that we can generate the URL check because we happened to
      // have defined our test data in a way that matches a pattern; the
      // pattern itself does NOT reflect a functional specification.
      expect(thumbnail.url).toEqual(`example.com/${thumbnail.resolution}`);
    });
  });

  it('should not create empty thumbnails', () => {
    const archiveVo = {
      ...defaultArchiveVo,
      thumbDT: '2022-02-27 10:00:00',
      thumbStatus: 'status.generic.ok',
      thumbURL200: 'example.com/200',
      thumbURL2000: 'example.com/2000',
      thumbURL500: 'example.com/500',
    };
    const thumbnails = archiveVoToThumbnails(archiveVo);
    expect(thumbnails.length).toBe(3);
  });

  it('should handle unknown thumbnail statuses', () => {
    const archiveVo = {
      ...defaultArchiveVo,
      thumbDT: '2022-02-27 10:00:00',
      thumbStatus: 'this.is.not.a.real.status',
      thumbURL200: 'example.com/200',
    };
    const thumbnails = archiveVoToThumbnails(archiveVo);
    expect(thumbnails.length).toBe(1);
    expect(thumbnails[0].status).toEqual(ThumbnailStatus.Unknown);
  });
});
