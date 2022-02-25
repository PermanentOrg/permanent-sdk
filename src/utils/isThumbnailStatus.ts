import { ThumbnailStatus } from '../types';
import { generateEnumTypeguard } from './generateEnumTypeguard';

export const isThumbnailStatus = generateEnumTypeguard(ThumbnailStatus);
