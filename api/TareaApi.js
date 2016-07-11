import axios from 'axios';
import API_URL from '../config';

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
    return axios.post(API_URL + '/tareas/area/create', payload);
  }

  static   updateTarea(payload) {
    return axios.post(API_URL + '/tareas/area/update/', payload);
  }

  static destroyTarea(id) {
    return axios.post(API_URL + '/tareas/area/destroy/', {id});
  }
}
export default TareaApi;
