import { ThumbnailStatus } from '../../types';
import { isThumbnailStatus } from '../';

describe('isThumbnailStatus', () => {
  it('should detect thumbnail status values', () => {
    expect(isThumbnailStatus(ThumbnailStatus.Ok)).toBe(true);
    expect(isThumbnailStatus(ThumbnailStatus.Generating)).toBe(true);
  });
  it('should detect thumbnail status strings', () => {
    expect(isThumbnailStatus('status.archive.gen_avatar')).toBe(true);
    expect(isThumbnailStatus('status.generic.ok')).toBe(true);
  });
});
