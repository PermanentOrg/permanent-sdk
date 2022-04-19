import type { ArchiveVo } from '../types';
import {
  makePermanentApiCall,
} from '../utils';

export async function getAllArchiveVos(authenticationToken: string): Promise<ArchiveVo[]> {
  const response = await makePermanentApiCall(
    authenticationToken,
    '/api/archive/getAllArchives',
    {
      method: 'POST',
      body: JSON.stringify({
        RequestVO: {
          data: [{
            AccountVO: {
              accountId: 2,
            },
          }],
        },
      }),
    },
  )
  const results = await response.json();
  const archiveVos = results.Results[0].data.map((result: { ArchiveVO: ArchiveVo } ): ArchiveVo => {
    const archiveVo = result.ArchiveVO;
    return archiveVo;
  });
  return archiveVos;
}
