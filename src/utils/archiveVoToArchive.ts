import type {
  ArchiveVo,
  Archive,
} from '../types';

import {
  AccessRole,
  ArchiveStatus,
  ArchiveType,
} from '../types';

export const archiveVoToArchive = (archiveVo: ArchiveVo): Archive => {
  return {
    id: archiveVo.archiveId,
    slug: `${archiveVo.archiveNbr}`,
    displayDate: new Date(archiveVo.createdDT),
    type: ArchiveType.Person,
    name: archiveVo.fullName,
    description: archiveVo.description,
    children: [],
    currentAccountAccessRole: AccessRole.Owner,
    thumbnails: [],
    containsPublicContent: archiveVo.public,
    status: ArchiveStatus.Ok,
    createdAt: new Date(archiveVo.createdDT),
    updatedAt: new Date(archiveVo.updateDT),
  };
};
