import axios from 'axios';
import API_URL from '../../../cfg/client/';

class PermisoApi {
  static getAllPermisos() {
    return axios.post(API_URL + '/permisos/findall', {});
  }
 static getOnePermisos(usuario_id) {
    return axios.post(API_URL + '/permisos/findone', {usuario_id});
  }

  static updatePermiso(permiso) {
    return axios.post(API_URL + '/permisos/update', permiso);
  }

  static createPermiso(permiso) {
    return axios.post(API_URL + '/permisos/create', permiso);
  }

  static destroyPermiso(id) {
    return axios.post(API_URL + '/permisos/destroy', {id});
  }
}

export default PermisoApi;
