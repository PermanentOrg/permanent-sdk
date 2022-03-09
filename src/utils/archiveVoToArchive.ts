import type {
  ArchiveVo,
  Archive,
} from '../types';
import {
  ArchiveType,
  AccessRole,
  ArchiveStatus,
} from '../types'
import { archiveVoToThumbnails } from './archiveVoToThumbnails';
import { isArchiveType } from './isArchiveType';
import { isAccessRole } from './isAccessRole';
import { isArchiveStatus } from './isArchiveStatus';

const typeCodeToArchiveType = (typeCode: string): ArchiveType =>
  isArchiveType(typeCode) ? typeCode : ArchiveType.Unknown;

const accessRoleCodeToAccessRole = (typeCode: string): AccessRole =>
  isAccessRole(typeCode) ? typeCode : AccessRole.Unknown;

const statusCodeToArchiveStatus = (typeCode: string): ArchiveStatus =>
  isArchiveStatus(typeCode) ? typeCode : ArchiveStatus.Unknown;

export const archiveVoToArchive = (archiveVo: ArchiveVo): Archive => ({
  id: archiveVo.archiveId,
  slug: archiveVo.archiveNbr.toString(),
  type: typeCodeToArchiveType(archiveVo.type),
  name: archiveVo.fullName,
  description: archiveVo.description,
  children: [],
  currentAccountAccessRole: accessRoleCodeToAccessRole(archiveVo.accessRole),
  thumbnails: archiveVoToThumbnails(archiveVo),
  containsPublicContent: archiveVo.public,
  status: statusCodeToArchiveStatus(archiveVo.status),
  createdAt: new Date(archiveVo.createdDT),
  updatedAt: new Date(archiveVo.updateDT),
});
