import axios from 'axios';
import * as qs from 'query-string';
import lodash from 'lodash';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 100000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

export const GET = (url: string, params = {}, config = {}) => {
  const queryString = params ? qs.stringify(params) : '';
  const urlWithQuery = lodash.size(params) > 0 ? `${url}?${queryString}` : url;
  return instance.get(urlWithQuery, config);
};

export const POST = (url: string, params = {}, config = {}) => {
  return instance.post(url, params, config);
};

export const PUT = (url: string, params: any, config = {}) => {
  return instance.put(url, params, config);
};

export const DELETE = (url: string, config = {}) => {
  return instance.delete(url, config);
};
