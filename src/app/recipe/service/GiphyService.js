import ApplicationError from '../../../error/ApplicationError';
import axios from 'axios';

class GiphyService {
  constructor({ apiKey, baseUrl }) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async fetchGif(term) {
    try {
      const endpoint = `${this.baseUrl}/search`;
      const params = {
        api_key: this.apiKey,
        q: term,
        limit: 1
      };
      const { data: gifs } = await axios.get(endpoint, {
        params
      });
      return gifs.data[0];
    } catch (error) {
      throw new ApplicationError(
        error.response.status,
        `An error occured when trying to fetch data from Giphy: ${error.response.data.message}`
      );
    }
  }
}

export default new GiphyService({
  apiKey: process.env.GIPHY_API_KEY,
  baseUrl: `http://api.giphy.com/v1/gifs`
});
