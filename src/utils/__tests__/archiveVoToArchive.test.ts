import { archiveVoToArchive } from '..';

describe('archiveVoToArchive', () => {
  it('should properly populate an Archive based on ArchiveVo data', () => {
    const archiveVo = {
      archiveId: 0,
      archiveNbr: '0000-0000',
      fullName: 'archive name',
      createdDT: '2022-07-10T14:59:03.853Z',
      updatedDT: '2022-08-10T14:59:03.853Z',
    };
    const archive = archiveVoToArchive(archiveVo);
    expect(archive).toEqual({
      id: 0,
      slug: '0000-0000',
      name: 'archive name',
      createdAt: new Date('2022-07-10T14:59:03.853Z'),
      updatedAt: new Date('2022-08-10T14:59:03.853Z'),
    });
  });
});
