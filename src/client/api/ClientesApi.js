import axios from 'axios';
import API_URL from '../../../cfg/client/';

class ClientesApi {
  static getAllClientes() {
    return axios.post(API_URL + '/clientes/findall', {});
  }

  static updateClientes(payload) {
      debugger;
    return axios.post(API_URL + '/clientes/update/', payload);
  }

  static createClientes(payload) {
    return axios.post(API_URL + '/clientes/create/', payload);
  }

  static destroyClientes(id) {
    return axios.post(API_URL + '/clientes/destroy/', {id});
  }
}

export default ClientesApi;