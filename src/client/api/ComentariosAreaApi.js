import axios from 'axios';
import API_URL from '../../../cfg/client/';

class ComentariosAreaApi {
  static getAllComentariosAreas() {
    return axios.post(API_URL + '/comentariosareas/findall/', {});
  }

  static createComentariosArea(payload) {
    return axios.post(API_URL + '/comentariosareas/create/', payload);
  }

  static   updateComentariosArea(payload) {
    return axios.post(API_URL + '/comentariosareas/update/', payload);
  }

  static destroyComentariosArea(id) {
    return axios.post(API_URL + '/comentariosareas/destroy/', {id});
  }
}
export default ComentariosAreaApi;
