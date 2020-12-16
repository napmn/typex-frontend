import ky from 'ky';

import { BASE_API_URL } from 'modules/shared/const';

export const apiService = ky.create({
  prefixUrl: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});
