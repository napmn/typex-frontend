import ky from 'ky';

import { BASE_API_URL } from 'modules/shared/const';

const apiService = ky.create({
  prefixUrl: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default apiService;
