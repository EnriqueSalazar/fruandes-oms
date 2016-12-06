import axios from 'axios';
import API_URL from '../../../cfg/client/';

class CustomApi {
  static getAllCustom() {
    return axios.post(API_URL + '/custom/findall', {});
  }

  static updateCustom(payload) {
    debugger
    return axios.post(API_URL + '/custom/update/', payload);
  }

  static createCustom(payload) {
    return axios.post(API_URL + '/custom/create/', payload);
  }

  static destroyCustom(id) {
    return axios.post(API_URL + '/custom/destroy/', {id});
  }
}

export default CustomApi;