import axios from 'axios';
import API_URL from '../config';

class AreaApi {
  static getAllAreas() {
    return axios.post(API_URL + '/areas/findall', {});
  }

  static updateArea(area) {
    return axios.post(API_URL + '/areas/update', area);
  }

  static createArea(area) {
    return axios.post(API_URL + '/areas/create', area);
  }

  static destroyArea(id) {
    return axios.post(API_URL + '/areas/destroy', {id});
  }
}

export default AreaApi;
