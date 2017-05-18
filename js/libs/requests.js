import axios from 'axios';
import { config } from '../global';

import { showSpinner, hideSpinner } from '../actions/spinner';
const {
    baseURL,
} = config;

const instance = axios.create({
  baseURL,
});
let dispatcher;

const showLoading = () => !!dispatcher && dispatcher(showSpinner());
const hideLoading = () => !!dispatcher && dispatcher(hideSpinner());

const reqSuccess = (config) => {
  // if (TOKEN) {
  //   config.headers.Authorization = `Bearer ${TOKEN.access_token}`;
  // }
  showLoading();
  return config;
};
const reqFailure = (error) => {
  hideLoading();
  return Promise.reject(error);
};

instance.interceptors.request.use(reqSuccess, reqFailure);

const reSuccess = (response) => {
  hideLoading();
  return response.data;
};

const reFailure = (error) => {
  // if (error.response && error.response.status === 401) {
  // }
  hideLoading();
  return Promise.reject(error);
};

instance.interceptors.response.use(reSuccess, reFailure);

export const setDispacher = (dispatch) => {
  dispatcher = dispatch;
};

export const setToken = (token) => {

};

export const postRequest = (url, data, options = {}) => instance.post(url, data, options);

export const getRequest = (url, params, options = {}) => instance.get(url, params, options);

export const putRequest = (url, data, options = {}) => instance.put(url, data, options);

export const deleteRequest = (url, params, options = {}) => instance.delete(url, params, options);

// export const uploadRequest = (flow) => {
//   flow.opts.target = `${baseURL}upload`;
//   flow.opts.headers = {
//     Authorization: `Bearer ${TOKEN.access_token}`,
//   };
//   flow.upload();
// };
