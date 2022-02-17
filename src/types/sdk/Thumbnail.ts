import type { ThumbnailStatus } from './ThumbnailStatus';

export interface Thumbnail {
  readonly resolution: number;
  readonly url: string;
  readonly status: ThumbnailStatus;
  readonly createdAt: Date;
}
