import axios from 'axios';
import API_URL from '../../../cfg/client/';

class MetaApi {
  static getAllMetas() {
    return axios.post(API_URL + '/metas/findall', {});
  }

  static getOneAreaMetas(id) {
    return axios.post(API_URL + '/metas/findall', {id});
  }

  static createMeta(payload) {
    return axios.post(API_URL + '/metas/create/?usuario_id='+localStorage.getItem('authUser_oms'), payload);
  }

  static   updateMeta(payload) {
    return axios.post(API_URL + '/metas/update/?usuario_id='+localStorage.getItem('authUser_oms'), payload);
  }

  static destroyMeta(id) {
    return axios.post(API_URL + '/metas/destroy/?usuario_id='+localStorage.getItem('authUser_oms'), {id});
  }
}
export default MetaApi;
