import nock from 'nock';
import { executePresignedPost } from '..';
import { bodyContainsMultipartFormFields } from '../../test/utils';

describe('executePresignedPost', () => {
  it('should populate the presigned post with provided headers', async () => {
    const dataBuffer = Buffer.from('hello');
    const bodyFields = {
      firstField: 'foo',
      anotherField: 'bar',
    };
    nock('https://example.com')
      .post(
        '/path',
        (body) => bodyContainsMultipartFormFields(
          body,
          {
            ...bodyFields,
            file: dataBuffer.toString(),
          },
        ),
      )
      .reply(200, 'it worked');

    const response = await executePresignedPost(
      {
        url: 'https://example.com/path',
        bodyFields,
        fileData: dataBuffer,
        fileSize: dataBuffer.length,
      },
    );
    const responseBody = await response.text();

    expect(responseBody).toEqual('it worked');
  });
});
