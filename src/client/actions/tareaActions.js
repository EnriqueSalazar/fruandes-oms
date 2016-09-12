import {toastr} from 'react-redux-toastr';
import TareaApi from '../api/TareaApi';

export const LOAD_TAREAS_SUCCESS = 'LOAD_TAREAS_SUCCESS';
export const LOAD_ONE_AREA_TAREAS_SUCCESS = 'LOAD_ONE_AREA_TAREAS_SUCCESS';
export const CREATE_TAREA_SUCCESS = 'CREATE_TAREA_SUCCESS';
export const UPDATE_TAREA_SUCCESS = 'UPDATE_TAREA_SUCCESS';
export const DESTROY_TAREA_SUCCESS = 'DESTROY_TAREA_SUCCESS';
export const STOP_ADD_TAREA_SUCCESS = 'STOP_ADD_TAREA_SUCCESS';
export const START_ADD_TAREA_SUCCESS = 'START_ADD_TAREA_SUCCESS';
export const STOP_MODAL_TAREA_SUCCESS = 'STOP_MODAL_TAREA_SUCCESS';
export const START_MODAL_TAREA_SUCCESS = 'START_MODAL_TAREA_SUCCESS';

export function loadTareasSuccess(tareas) {
  return {type: LOAD_TAREAS_SUCCESS, tareas};
}
export function loadOneAreaTareasSuccess(tareas) {
  return {type: LOAD_ONE_AREA_TAREAS_SUCCESS, tareas};
}
export function updateTareasSuccess() {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_TAREA_SUCCESS};
}
export function createTareasSuccess() {
  toastr.success('Creación exitosa.');
  return {type: CREATE_TAREA_SUCCESS};
}
export function destroyTareasSuccess() {
  toastr.success('Eliminación exitosa.');
  return {type: DESTROY_TAREA_SUCCESS};
}
export function stopAddingTareaSuccess() {
  return {type: STOP_ADD_TAREA_SUCCESS};
}
export function startAddingTareaSuccess() {
  return {type: START_ADD_TAREA_SUCCESS};
}
export function stopModalTareaSuccess() {
  return {type: STOP_MODAL_TAREA_SUCCESS};
}
export function startModalTareaSuccess(tareaModalId) {
  return {type: START_MODAL_TAREA_SUCCESS, tareaModalId};
}

export function loadTareas() {
  return dispatch => {
    return TareaApi.getAllTareas().then(tareas => {
      dispatch(loadTareasSuccess(tareas.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOneAreaTareas(area_id) {
  return dispatch => {
    return TareaApi.findOneAreaTareas(area_id).then(tareas => {
      dispatch(loadOneAreaTareasSuccess(tareas.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateTarea(tarea) {
  return dispatch => {
    return TareaApi.updateTarea(tarea).then(() => {
      dispatch(updateTareasSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function createTarea(tarea) {
  return dispatch => {
    return TareaApi.createTarea(tarea).then(() => {
      dispatch(createTareasSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyTarea(tarea) {
  return dispatch => {
    return TareaApi.destroyTarea(tarea.id).then(() => {
      dispatch(destroyTareasSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function startAddingTarea() {
  return dispatch => {
    return dispatch(startAddingTareaSuccess());
  };
}

export function stopAddingTarea() {
  return dispatch => {
    return dispatch(stopAddingTareaSuccess());
  };
}

export function startModalTarea(tareaModalId) {
  return dispatch => {
    return dispatch(startModalTareaSuccess(tareaModalId));
  };
}

export function stopModalTarea() {
  return dispatch => {
    return dispatch(stopModalTareaSuccess());
  };
}
