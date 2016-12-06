import {toastr} from 'react-redux-toastr';
import ComentariosAreaApi from '../api/ComentariosAreaApi';

export const LOAD_COMENTARIOS_AREAS_SUCCESS = 'LOAD_COMENTARIOS_AREAS_SUCCESS';
export const CREATE_COMENTARIOS_AREA_SUCCESS = 'CREATE_COMENTARIOS_AREA_SUCCESS';
export const UPDATE_COMENTARIOS_AREA_SUCCESS = 'UPDATE_COMENTARIOS_AREA_SUCCESS';
export const DESTROY_COMENTARIOS_AREA_SUCCESS = 'DESTROY_COMENTARIOS_AREA_SUCCESS';

export function loadComentariosAreasSuccess(comentariosAreas) {
  return {type: LOAD_COMENTARIOS_AREAS_SUCCESS, comentariosAreas};
}
export function updateComentariosAreasSuccess() {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_COMENTARIOS_AREA_SUCCESS};
}
export function createComentariosAreasSuccess() {
  toastr.success('Creación exitosa.');
  return {type: CREATE_COMENTARIOS_AREA_SUCCESS};
}
export function destroyComentariosAreasSuccess() {
  toastr.success('Eliminación exitosa.');
  return {type: DESTROY_COMENTARIOS_AREA_SUCCESS};
}


export function loadComentariosAreas() {
  return dispatch => {
    return ComentariosAreaApi.getAllComentariosAreas().then(comentariosAreas => {
      dispatch(loadComentariosAreasSuccess(comentariosAreas.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateComentariosArea(comentariosArea) {
  return dispatch => {
    return ComentariosAreaApi.updateComentariosArea(comentariosArea).then(() => {
      dispatch(updateComentariosAreasSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function createComentariosArea(comentariosArea) {
  return dispatch => {
    return ComentariosAreaApi.createComentariosArea(comentariosArea).then(() => {
      dispatch(createComentariosAreasSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyComentariosArea(comentariosArea) {
  return dispatch => {
    return ComentariosAreaApi.destroyComentariosArea(comentariosArea.id).then(() => {
      dispatch(destroyComentariosAreasSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}


