import {toastr} from 'react-redux-toastr';
import CustomApi from '../api/CustomApi';

export const LOAD_CUSTOM_SUCCESS = 'LOAD_CUSTOM_SUCCESS';
export const CREATE_CUSTOM_SUCCESS = 'CREATE_CUSTOM_SUCCESS';
export const UPDATE_CUSTOM_SUCCESS = 'UPDATE_CUSTOM_SUCCESS';
export const DESTROY_CUSTOM_SUCCESS = 'DESTROY_CUSTOM_SUCCESS';
export const STOP_ADD_CUSTOM_SUCCESS = 'STOP_ADD_CUSTOM_SUCCESS';
export const START_ADD_CUSTOM_SUCCESS = 'START_ADD_CUSTOM_SUCCESS';
export const STOP_MODAL_CUSTOM_SUCCESS = 'STOP_MODAL_CUSTOM_SUCCESS';
export const START_MODAL_CUSTOM_SUCCESS = 'START_MODAL_CUSTOM_SUCCESS';
export const UPDATE_CUSTOM_RENDER_OPTIONS_SUCCESS = 'UPDATE_CUSTOM_RENDER_OPTIONS_SUCCESS';

export function loadCustomSuccess(custom) {
  return {type: LOAD_CUSTOM_SUCCESS, custom};
}
export function updateRenderOptionsSuccess(renderOptions) {
  return {type: UPDATE_CUSTOM_RENDER_OPTIONS_SUCCESS, renderOptions};
}
export function updateCustomSuccess() {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_CUSTOM_SUCCESS};
}
export function createCustomSuccess() {
  toastr.success('Creación exitosa.');
  return {type: CREATE_CUSTOM_SUCCESS};
}
export function destroyCustomSuccess() {
  toastr.success('Eliminación exitosa.');
  return {type: DESTROY_CUSTOM_SUCCESS};
}
export function stopAddingCustomSuccess() {
  return {type: STOP_ADD_CUSTOM_SUCCESS};
}
export function startAddingCustomSuccess() {
  return {type: START_ADD_CUSTOM_SUCCESS};
}
export function stopModalCustomSuccess() {
  return {type: STOP_MODAL_CUSTOM_SUCCESS};
}
export function startModalCustomSuccess(customModalId) {
  return {type: START_MODAL_CUSTOM_SUCCESS, customModalId};
}

export function loadCustom() {
  return dispatch => {
    return CustomApi.getAllCustom().then(custom => {
      dispatch(loadCustomSuccess(custom.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateCustom(custom) {
  debugger
  return dispatch => {
    return CustomApi.updateCustom(custom).then(() => {
      dispatch(updateCustomSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function createCustom(custom) {
  return dispatch => {
    return CustomApi.createCustom(custom).then(() => {
      dispatch(createCustomSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyCustom(custom) {
  return dispatch => {
    return CustomApi.destroyCustom(custom.id).then(() => {
      dispatch(destroyCustomSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function startAddingCustom() {
  return dispatch => {
    return dispatch(startAddingCustomSuccess());
  };
}

export function stopAddingCustom() {
  return dispatch => {
    return dispatch(stopAddingCustomSuccess());
  };
}

export function updateRenderOptions(renderOptions) {
  return dispatch => {
    return dispatch(updateRenderOptionsSuccess(renderOptions));
  };
}

export function startModalCustom(customModalId) {
  return dispatch => {
    return dispatch(startModalCustomSuccess(customModalId));
  };
}

export function stopModalCustom() {
  return dispatch => {
    return dispatch(stopModalCustomSuccess());
  };
}
