import axios from 'axios';
import API_URL from '../../../cfg/client/';

class RecurrenteApi {
  static getAllRecurrentes() {
    return axios.post(API_URL + '/recurrentes/findall', {});
  }

  static getActiveRecurrentes(payload) {
    return axios.post(API_URL + '/recurrentes/findactive', payload);
  }

  static getDoneRecurrentes() {
    return axios.post(API_URL + '/recurrentes/finddone', {});
  }

  static findOneRecurrente(id) {
    return axios.post(API_URL + '/recurrentes/findone', {id});
  }

  static findOneAreaRecurrentes(id) {
    return axios.post(API_URL + '/recurrentes/findall', {id});
  }

  static createRecurrente(payload) {
    return axios.post(API_URL + '/recurrentes/create', payload);
  }

  static doneRecurrente(payload) {
    return axios.post(API_URL + '/recurrentes/done', payload);
  }

  static   updateRecurrente(payload) {
    return axios.post(API_URL + '/recurrentes/update/', payload);
  }

  static destroyRecurrente(id) {
    return axios.post(API_URL + '/recurrentes/destroy/', {id});
  }
}
export default RecurrenteApi;
