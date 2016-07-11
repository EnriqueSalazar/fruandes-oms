import axios from 'axios';
import API_URL from '../config';

class MetaApi {
  static getAllMetas() {
    return axios.post(API_URL + '/metas/findall', {});
  }

  static getOneAreaMetas(id) {
    return axios.post(API_URL + '/metas/findall', {id});
  }

  static createMeta(payload) {
    return axios.post(API_URL + '/metas/create', payload);
  }

  static   updateMeta(payload) {
    return axios.post(API_URL + '/metas/update/', payload);
  }

  static destroyMeta(id) {
    return axios.post(API_URL + '/metas/destroy/', {id});
  }
}
export default MetaApi;
