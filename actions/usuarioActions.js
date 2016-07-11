import {toastr} from 'react-redux-toastr';
import UsuarioApi from '../api/UsuarioApi';

export const LOAD_USUARIOS_SUCCESS = 'LOAD_USUARIOS_SUCCESS';
export const CREATE_USUARIO_SUCCESS = 'CREATE_USUARIO_SUCCESS';
export const UPDATE_USUARIO_SUCCESS = 'UPDATE_USUARIO_SUCCESS';
export const DESTROY_USUARIO_SUCCESS = 'DESTROY_USUARIO_SUCCESS';
export const STOP_ADD_USUARIO_SUCCESS = 'STOP_ADD_USUARIO_SUCCESS';
export const START_ADD_USUARIO_SUCCESS = 'START_ADD_USUARIO_SUCCESS';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export function loadUsuariosSuccess(usuarios) {
  return {type: LOAD_USUARIOS_SUCCESS, usuarios};
}
export function updateUsuariosSuccess() {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_USUARIO_SUCCESS};
}
export function createUsuariosSuccess() {
  toastr.success('Creación exitosa.');
  return {type: CREATE_USUARIO_SUCCESS};
}
export function destroyUsuariosSuccess() {
  toastr.success('Eliminación exitosa.');
  return {type: DESTROY_USUARIO_SUCCESS};
}

export function stopAddingUsuarioSuccess() {
  return {type: STOP_ADD_USUARIO_SUCCESS};
}
export function startAddingUsuarioSuccess() {
  return {type: START_ADD_USUARIO_SUCCESS};
}

export function logoutUsuarioSuccess() {
  return {type: LOGOUT_USER_SUCCESS};
}
export function loginUsuarioSuccess(authUser) {
  return {type: LOGIN_USER_SUCCESS, authUser};
}

export function loadUsuarios() {
  return dispatch => {
    return UsuarioApi.getAllUsuarios().then(usuarios => {
      dispatch(loadUsuariosSuccess(usuarios.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateUsuario(usuario) {
  return dispatch => {
    return UsuarioApi.updateUsuario(usuario).then(() => {
      dispatch(updateUsuariosSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function createUsuario(usuario) {
  return dispatch => {
    return UsuarioApi.createUsuario(usuario).then(() => {
      dispatch(createUsuariosSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyUsuario(usuario) {
  return dispatch => {
    return UsuarioApi.destroyUsuario(usuario.id).then(() => {
      dispatch(destroyUsuariosSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function startAddingUsuario() {
  return dispatch => {
    return dispatch(startAddingUsuarioSuccess());
  };
}

export function stopAddingUsuario() {
  return dispatch => {
    return dispatch(stopAddingUsuarioSuccess());
  };
}

export function loginUsuario(payload) {
  return dispatch => {
    return UsuarioApi.loginUsuario(payload).then((usuario) => {
      debugger
      dispatch(loginUsuarioSuccess(usuario.data.result.id));
    }).catch(error => {
      throw(error);
    });
  };
}

export function logoutUsuario() {
  return dispatch => {
    return dispatch(logoutUsuarioSuccess());
  };
}
