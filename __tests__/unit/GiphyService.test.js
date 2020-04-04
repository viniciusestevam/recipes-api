import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import GiphyService from '../../src/app/recipe/service/GiphyService';

const axiosMock = new MockAdapter(axios);

it('should return statusCode 200', async () => {
  const params = {
    api_key: GiphyService.apiKey,
    q: 'test',
    limit: 1
  };
  axiosMock
    .onGet(`${GiphyService.baseUrl}/search`, { params })
    .reply(200, { data: [{ ok: true }] });

  await expect(GiphyService.fetchGif('test')).resolves.toEqual({
    ok: true
  });
});

it('should throw with status !== 200 on get gifs', async () => {
  const params = {
    api_key: GiphyService.apiKey,
    q: 'test',
    limit: 1
  };
  axiosMock.onGet(`${GiphyService.baseUrl}/search`, { params }).reply(999, {
    data: {
      statusText: 'test'
    }
  });
  await expect(GiphyService.fetchGif('any')).rejects.toThrow();
});
