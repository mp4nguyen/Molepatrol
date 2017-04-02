import axios from 'axios';
import { config } from '../global';

const {
    baseURL,
} = config;

const instance = axios.create({
  baseURL,
});


instance.interceptors.request.use((config) => {
  // if (TOKEN) {
  //   config.headers.Authorization = `Bearer ${TOKEN.access_token}`;
  // }
  console.log(config);
  return config;
}, error => Promise.reject(error));

instance.interceptors.response.use(response => response.data, (error) => {
  if (error.response && error.response.status === 401) {
    
  }
  console.log(error);
  return Promise.reject(error);
});
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
