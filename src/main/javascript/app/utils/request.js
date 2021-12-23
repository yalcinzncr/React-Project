import axios from 'axios';

export const request = {
  get: url => axios.get(url),
  getByte: url => axios.get(url, { responseType: 'arraybuffer' }),
  post: (url, data) => axios.post(url, data),
  patch: (url, data) => axios.patch(url, data),
};
