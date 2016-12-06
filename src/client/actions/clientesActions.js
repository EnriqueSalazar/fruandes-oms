import {toastr} from 'react-redux-toastr';
import ClientesApi from '../api/ClientesApi';

export const LOAD_CLIENTES_SUCCESS = 'LOAD_CLIENTES_SUCCESS';
export const CREATE_CLIENTES_SUCCESS = 'CREATE_CLIENTES_SUCCESS';
export const UPDATE_CLIENTES_SUCCESS = 'UPDATE_CLIENTES_SUCCESS';
export const DESTROY_CLIENTES_SUCCESS = 'DESTROY_CLIENTES_SUCCESS';
export const STOP_ADD_CLIENTES_SUCCESS = 'STOP_ADD_CLIENTES_SUCCESS';
export const START_ADD_CLIENTES_SUCCESS = 'START_ADD_CLIENTES_SUCCESS';
export const STOP_MODAL_CLIENTES_SUCCESS = 'STOP_MODAL_CLIENTES_SUCCESS';
export const START_MODAL_CLIENTES_SUCCESS = 'START_MODAL_CLIENTES_SUCCESS';
export const UPDATE_CLIENTES_RENDER_OPTIONS_SUCCESS = 'UPDATE_CLIENTES_RENDER_OPTIONS_SUCCESS';

export function loadClientesSuccess(clientes) {
  return {type: LOAD_CLIENTES_SUCCESS, clientes};
}
export function updateRenderOptionsSuccess(renderOptions) {
  return {type: UPDATE_CLIENTES_RENDER_OPTIONS_SUCCESS, renderOptions};
}
export function updateClientesSuccess() {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_CLIENTES_SUCCESS};
}
export function createClientesSuccess() {
  toastr.success('Creación exitosa.');
  return {type: CREATE_CLIENTES_SUCCESS};
}
export function destroyClientesSuccess() {
  toastr.success('Eliminación exitosa.');
  return {type: DESTROY_CLIENTES_SUCCESS};
}
export function stopAddingClientesSuccess() {
  return {type: STOP_ADD_CLIENTES_SUCCESS};
}
export function startAddingClientesSuccess() {
  return {type: START_ADD_CLIENTES_SUCCESS};
}
export function stopModalClientesSuccess() {
  return {type: STOP_MODAL_CLIENTES_SUCCESS};
}
export function startModalClientesSuccess(clientesModalId) {
  return {type: START_MODAL_CLIENTES_SUCCESS, clientesModalId};
}

export function loadClientes() {
  return dispatch => {
    return ClientesApi.getAllClientes().then(clientes => {
      dispatch(loadClientesSuccess(clientes.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateClientes(clientes) {
  debugger;
  return dispatch => {
    return ClientesApi.updateClientes(clientes).then(() => {
      dispatch(updateClientesSuccess());
        debugger;
    }).catch(error => {
      throw(error);
    });
      debugger;
  };
}
export function createClientes(clientes) {
  return dispatch => {
    return ClientesApi.createClientes(clientes).then(() => {
      dispatch(createClientesSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyClientes(clientes) {
  return dispatch => {
    return ClientesApi.destroyClientes(clientes.id).then(() => {
      dispatch(destroyClientesSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function startAddingClientes() {
  return dispatch => {
    return dispatch(startAddingClientesSuccess());
  };
}

export function stopAddingClientes() {
  return dispatch => {
    return dispatch(stopAddingClientesSuccess());
  };
}

export function updateRenderOptions(renderOptions) {
  return dispatch => {
    return dispatch(updateRenderOptionsSuccess(renderOptions));
  };
}

export function startModalClientes(clientesModalId) {
  return dispatch => {
    return dispatch(startModalClientesSuccess(clientesModalId));
  };
}

export function stopModalClientes() {
  return dispatch => {
    return dispatch(stopModalClientesSuccess());
  };
}
