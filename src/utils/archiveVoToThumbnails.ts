import type {
  ArchiveVo,
  Thumbnail,
} from '../types';

import { ThumbnailStatus } from '../types';
import { isThumbnailStatus } from './isThumbnailStatus';

const statusCodeToThumbnailStatus = (statusCode: string): ThumbnailStatus => (
  isThumbnailStatus(statusCode) ? statusCode : ThumbnailStatus.Unknown
);

export const archiveVoToThumbnails = (archiveVo: ArchiveVo): Thumbnail[] => {
  const status = statusCodeToThumbnailStatus(archiveVo.thumbStatus);
  const createdAt = new Date(archiveVo.thumbDT);

  return [
    {
      resolution: 200,
      url: archiveVo.thumbURL200,
    },
    {
      resolution: 500,
      url: archiveVo.thumbURL500,
    },
    {
      resolution: 1000,
      url: archiveVo.thumbURL1000,
    },
    {
      resolution: 2000,
      url: archiveVo.thumbURL2000,
    },
  ].filter((thumbnail) => thumbnail.url !== '')
    .map((thumbnail) => ({
      ...thumbnail,
      status,
      createdAt,
    }));
};
