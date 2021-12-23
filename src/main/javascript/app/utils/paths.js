export const API_NAVIGATION_URL = '/navigation';
export const API_USERINFO_URL = '/userinfo';


import axios from 'axios';

const { APIBASE } = process.env;


export const APIGet = url => () => axios.get(APIBASE + url);

export const APIGetWithParam = (url, paramsMap) => () => axios.get(APIBASE + createParameteredUrl(url, paramsMap));

export const APIPost = (url, params) => () => axios.post(APIBASE + url, params);

export const APIPostWithParam = (url, paramsMap, data) => () => axios.post(APIBASE + createParameteredUrl(url, paramsMap), data);

const createParameteredUrl = (url, paramsMap) => {
  let parameteredUrl = `${url}?`;
  paramsMap.forEach((value, key) => {
    parameteredUrl += `${key}=${value}&`;
  });

  return parameteredUrl.substring(0, parameteredUrl.length - 1);
};

