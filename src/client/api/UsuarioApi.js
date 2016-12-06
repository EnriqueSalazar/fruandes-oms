import axios from 'axios';
import API_URL from '../../../cfg/client/';

class UsuarioApi {
  static getAllUsuarios() {
    return axios.post(API_URL + '/usuarios/findall', {});
  }

  static createUsuario(payload) {
    return axios.post(API_URL + '/usuarios/create', payload);
  }

  static   updateUsuario(payload) {
    return axios.post(API_URL + '/usuarios/update/', payload);
  }

  static destroyUsuario(id) {
    return axios.post(API_URL + '/usuarios/destroy/', {id});
  }
  static loginUsuario(payload) {
    return axios.post(API_URL + '/usuarios/knockknock/', payload);
  }
}
export default UsuarioApi;
