import axios from 'axios';
import API_URL from '../../../cfg/client/';

class AreaApi {
  static getAllAreas() {
    return axios.post(API_URL + '/areas/findall', {});
  }

  static updateArea(area) {
    return axios.post(API_URL + '/areas/update/?usuario_id='+localStorage.getItem('authUser_oms'), area);
  }

  static createArea(area) {
    return axios.post(API_URL + '/areas/create/?usuario_id='+localStorage.getItem('authUser_oms'), area);
  }

  static destroyArea(id) {
    return axios.post(API_URL + '/areas/destroy/?usuario_id='+localStorage.getItem('authUser_oms'), {id});
  }
}

export default AreaApi;
