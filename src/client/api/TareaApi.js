import axios from 'axios';
import API_URL from '../../../cfg/client/';

class TareaApi {
  static getAllTareas() {
    return axios.post(API_URL + '/tareas/areas/findall', {});
  }

  static findOneTarea(id) {
    return axios.post(API_URL + '/tareas/findone', {id});
  }

  static findOneAreaTareas(id) {
    return axios.post(API_URL + '/tareas/area/findall', {id});
  }

  static createTarea(payload) {
    return axios.post(API_URL + '/tareas/area/create/?usuario_id='+localStorage.getItem('authUser_oms'), payload);
  }

  static   updateTarea(payload) {
    return axios.post(API_URL + '/tareas/area/update/?usuario_id='+localStorage.getItem('authUser_oms'), payload);
  }

  static destroyTarea(id) {
    return axios.post(API_URL + '/tareas/area/destroy/?usuario_id='+localStorage.getItem('authUser_oms'), {id});
  }
}
export default TareaApi;
