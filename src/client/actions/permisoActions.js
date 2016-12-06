import {toastr} from 'react-redux-toastr';
import PermisoApi from '../api/PermisoApi';

export const LOAD_PERMISOS_SUCCESS = 'LOAD_PERMISOS_SUCCESS';
export const LOAD_ONE_PERMISOS_SUCCESS = 'LOAD_ONE_PERMISOS_SUCCESS';
export const CREATE_PERMISO_SUCCESS = 'CREATE_PERMISO_SUCCESS';
export const UPDATE_PERMISO_SUCCESS = 'UPDATE_PERMISO_SUCCESS';
export const DESTROY_PERMISO_SUCCESS = 'DESTROY_PERMISO_SUCCESS';
export const STOP_ADD_PERMISO_SUCCESS = 'STOP_ADD_PERMISO_SUCCESS';
export const START_ADD_PERMISO_SUCCESS = 'START_ADD_PERMISO_SUCCESS';
export const UPDATE_PERMISO_RENDER_OPTIONS_SUCCESS = 'UPDATE_PERMISO_RENDER_OPTIONS_SUCCESS';

export function loadPermisosSuccess(permisos) {
  return {type: LOAD_PERMISOS_SUCCESS, permisos};
}
export function loadOnePermisosSuccess(onePermisos) {
  return {type: LOAD_ONE_PERMISOS_SUCCESS, onePermisos};
}
export function updateRenderOptionsSuccess(renderOptions) {
  return {type: UPDATE_PERMISO_RENDER_OPTIONS_SUCCESS, renderOptions};
}
export function updatePermisosSuccess() {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_PERMISO_SUCCESS};
}
export function createPermisosSuccess() {
  toastr.success('Creación exitosa.');
  return {type: CREATE_PERMISO_SUCCESS};
}
export function destroyPermisosSuccess() {
  toastr.success('Eliminación exitosa.');
  return {type: DESTROY_PERMISO_SUCCESS};
}

export function stopAddingPermisoSuccess() {
  return {type: STOP_ADD_PERMISO_SUCCESS};
}
export function startAddingPermisoSuccess() {
  return {type: START_ADD_PERMISO_SUCCESS};
}

export function loadPermisos() {
  return dispatch => {
    return PermisoApi.getAllPermisos().then(permisos => {
      dispatch(loadPermisosSuccess(permisos.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadOnePermisos(usuario_id) {
  return dispatch => {
    return PermisoApi.getOnePermisos(usuario_id).then(permisos => {
      dispatch(loadOnePermisosSuccess(permisos.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updatePermiso(permiso) {
  return dispatch => {
    return PermisoApi.updatePermiso(permiso).then(() => {
      dispatch(updatePermisosSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function createPermiso(permiso) {
  debugger
  return dispatch => {
    return PermisoApi.createPermiso(permiso).then(() => {
      dispatch(createPermisosSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyPermiso(permiso) {
  return dispatch => {
    return PermisoApi.destroyPermiso(permiso.id).then(() => {
      dispatch(destroyPermisosSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function startAddingPermiso() {
  return dispatch => {
    return dispatch(startAddingPermisoSuccess());
  };
}

export function stopAddingPermiso() {
  return dispatch => {
    return dispatch(stopAddingPermisoSuccess());
  };
}

export function updateRenderOptions(renderOptions) {
  // debugger
  return dispatch => {
    return dispatch(updateRenderOptionsSuccess(renderOptions));
  };
}
