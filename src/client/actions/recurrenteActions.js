import {toastr} from 'react-redux-toastr';
import RecurrenteApi from '../api/RecurrenteApi';

export const LOAD_RECURRENTES_SUCCESS = 'LOAD_RECURRENTES_SUCCESS';
export const LOAD_ACTIVE_RECURRENTES_SUCCESS = 'LOAD_ACTIVE_RECURRENTES_SUCCESS';
export const LOAD_DONE_RECURRENTES_SUCCESS = 'LOAD_DONE_RECURRENTES_SUCCESS';
export const CREATE_RECURRENTE_SUCCESS = 'CREATE_RECURRENTE_SUCCESS';
export const DONE_RECURRENTE_SUCCESS = 'DONE_RECURRENTE_SUCCESS';
export const UPDATE_RECURRENTE_SUCCESS = 'UPDATE_RECURRENTE_SUCCESS';
export const DESTROY_RECURRENTE_SUCCESS = 'DESTROY_RECURRENTE_SUCCESS';
export const STOP_ADD_RECURRENTE_SUCCESS = 'STOP_ADD_RECURRENTE_SUCCESS';
export const START_ADD_RECURRENTE_SUCCESS = 'START_ADD_RECURRENTE_SUCCESS';
export const STOP_MODAL_RECURRENTE_SUCCESS = 'STOP_MODAL_RECURRENTE_SUCCESS';
export const START_MODAL_RECURRENTE_SUCCESS = 'START_MODAL_RECURRENTE_SUCCESS';

export function loadRecurrentesSuccess(recurrentes) {
  console.error('recurrentes loadRecurrentesSuccess')
  return {type: LOAD_RECURRENTES_SUCCESS, recurrentes};
}
export function loadActiveRecurrentesSuccess(active) {
  console.error('recurrentes loadActiveRecurrentesSuccess')

  return {type: LOAD_ACTIVE_RECURRENTES_SUCCESS, active};
}
export function loadDoneRecurrentesSuccess(done) {
  console.error('recurrentes loadActiveRecurrentesSuccess')
  return {type: LOAD_DONE_RECURRENTES_SUCCESS, done};
}
export function updateRecurrentesSuccess() {
  console.error('recurrentes updateRecurrentesSuccess')
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_RECURRENTE_SUCCESS};
}
export function createRecurrentesSuccess() {
  toastr.success('Creación exitosa.');
  return {type: CREATE_RECURRENTE_SUCCESS};
}
export function doneRecurrentesSuccess() {
  toastr.success('Creación exitosa.');
  return {type: DONE_RECURRENTE_SUCCESS};
}
export function destroyRecurrentesSuccess() {
  toastr.success('Eliminación exitosa.');
  return {type: DESTROY_RECURRENTE_SUCCESS};
}
export function stopAddingRecurrenteSuccess() {
  return {type: STOP_ADD_RECURRENTE_SUCCESS};
}
export function startAddingRecurrenteSuccess() {
  return {type: START_ADD_RECURRENTE_SUCCESS};
}
export function stopModalRecurrenteSuccess() {
  return {type: STOP_MODAL_RECURRENTE_SUCCESS};
}
export function startModalRecurrenteSuccess(recurrenteModalId) {
  return {type: START_MODAL_RECURRENTE_SUCCESS, recurrenteModalId};
}

export function loadRecurrentes() {
  return dispatch => {
    return RecurrenteApi.getAllRecurrentes().then(recurrentes => {
      dispatch(loadRecurrentesSuccess(recurrentes.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadActiveRecurrentes(recurrente) {
  return dispatch => {
    return RecurrenteApi.getActiveRecurrentes(recurrente).then(active => {
      dispatch(loadActiveRecurrentesSuccess(active.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadDoneRecurrentes() {
  return dispatch => {
    return RecurrenteApi.getDoneRecurrentes().then(done => {
      dispatch(loadDoneRecurrentesSuccess(done.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}


export function updateRecurrente(recurrente) {
  return dispatch => {
    return RecurrenteApi.updateRecurrente(recurrente).then(() => {
      dispatch(updateRecurrentesSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function doneRecurrente(recurrente) {
  return dispatch => {
    return RecurrenteApi.doneRecurrente(recurrente).then(() => {
      dispatch(doneRecurrentesSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function createRecurrente(recurrente) {
  return dispatch => {
    return RecurrenteApi.createRecurrente(recurrente).then(() => {
      dispatch(createRecurrentesSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyRecurrente(recurrente) {
  return dispatch => {
    return RecurrenteApi.destroyRecurrente(recurrente.id).then(() => {
      dispatch(destroyRecurrentesSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function startAddingRecurrente() {
  return dispatch => {
    return dispatch(startAddingRecurrenteSuccess());
  };
}

export function stopAddingRecurrente() {
  return dispatch => {
    return dispatch(stopAddingRecurrenteSuccess());
  };
}

export function startModalRecurrente(recurrenteModalId) {
  return dispatch => {
    return dispatch(startModalRecurrenteSuccess(recurrenteModalId));
  };
}

export function stopModalRecurrente() {
  return dispatch => {
    return dispatch(stopModalRecurrenteSuccess());
  };
}
