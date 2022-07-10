import nock from 'nock';
import { makePermanentApiCall } from '..';

describe('makePermanentApiCall', () => {
  it('should default calls to https://permanent.org/api/*', async () => {
    nock('https://permanent.org')
      .get('/api/testing')
      .reply(200, 'it worked');

    const response = await makePermanentApiCall(
      { bearerToken: '12345' },
      '/testing',
    );
    const responseBody = await response.text();

    expect(responseBody).toEqual('it worked');
  });

  it('should allow baseUrl overrides', async () => {
    nock('https://permanent.local')
      .get('/api/testing')
      .reply(200, 'it worked');

    const response = await makePermanentApiCall(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      '/testing',
    );
    const responseBody = await response.text();

    expect(responseBody).toEqual('it worked');
  });

  it('should populate the correct headers in its request', async () => {
    nock('https://permanent.local', {
      reqheaders: {
        Authorization: 'Bearer 12345',
        'Request-Version': '2',
        'Content-Type': 'application/json',
      },
    })
      .get('/api/testing')
      .reply(200, 'it worked');

    const response = await makePermanentApiCall(
      {
        bearerToken: '12345',
        baseUrl: 'https://permanent.local/api',
      },
      '/testing',
    );
    const responseBody = await response.text();

    expect(responseBody).toEqual('it worked');
  });
});
