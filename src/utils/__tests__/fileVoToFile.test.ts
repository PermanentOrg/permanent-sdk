import { DerivativeType } from '../../types';
import { fileVoToFile } from '..';

describe('fileVoToFile', () => {
  it('should properly populate a File based on FileVo data will null fields', () => {
    const fileVo = {
      fileId: 71,
      size: 1337,
      format: 'file.format.original',
      contentType: undefined,
      md5Checksum: undefined,
      fileURL: undefined,
      downloadURL: undefined,
      createdDT: '2022-08-10T14:59:03.853Z',
      updatedDT: '2022-09-10T14:59:03.853Z',
    };
    const file = fileVoToFile(fileVo);
    expect(file).toEqual({
      id: 71,
      size: 1337,
      contentType: '',
      derivativeType: DerivativeType.Original,
      fileUrl: '',
      downloadUrl: '',
      checksum: '',
      createdAt: new Date('2022-08-10T14:59:03.853Z'),
      updatedAt: new Date('2022-09-10T14:59:03.853Z'),
    });
  });

  it('should properly populate a File with an unknown format', () => {
    const fileVo = {
      fileId: 71,
      size: 1337,
      format: 'this is totally made up and not a real format',
      contentType: 'wombat',
      md5Checksum: '123456ABCDE',
      fileURL: 'hello.permanent.org',
      downloadURL: 'download.permanent.org',
      createdDT: '2022-08-10T14:59:03.853Z',
      updatedDT: '2022-09-10T14:59:03.853Z',
    };
    const file = fileVoToFile(fileVo);
    expect(file).toEqual({
      id: 71,
      size: 1337,
      contentType: 'wombat',
      derivativeType: DerivativeType.Unknown,
      fileUrl: 'hello.permanent.org',
      downloadUrl: 'download.permanent.org',
      checksum: '123456ABCDE',
      createdAt: new Date('2022-08-10T14:59:03.853Z'),
      updatedAt: new Date('2022-09-10T14:59:03.853Z'),
    });
  });
});
