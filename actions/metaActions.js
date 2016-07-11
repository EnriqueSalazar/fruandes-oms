import {toastr} from 'react-redux-toastr';
import MetaApi from '../api/MetaApi';

export const LOAD_METAS_SUCCESS = 'LOAD_METAS_SUCCESS';
export const LOAD_ONE_AREA_METAS_SUCCESS = 'LOAD_ONE_AREA_METAS_SUCCESS';
export const CREATE_META_SUCCESS = 'CREATE_META_SUCCESS';
export const UPDATE_META_SUCCESS = 'UPDATE_META_SUCCESS';
export const DESTROY_META_SUCCESS = 'DESTROY_META_SUCCESS';
export const STOP_ADD_META_SUCCESS = 'STOP_ADD_META_SUCCESS';
export const START_ADD_META_SUCCESS = 'START_ADD_META_SUCCESS';
export const STOP_MODAL_META_SUCCESS = 'STOP_MODAL_META_SUCCESS';
export const START_MODAL_META_SUCCESS = 'START_MODAL_META_SUCCESS';

export function loadMetasSuccess(metas) {
  return {type: LOAD_METAS_SUCCESS, metas};
}
export function loadOneAreaMetasSuccess(metas) {
  return {type: LOAD_ONE_AREA_METAS_SUCCESS, metas};
}
export function updateMetasSuccess() {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_META_SUCCESS};
}
export function createMetasSuccess() {
  toastr.success('Creación exitosa.');
  return {type: CREATE_META_SUCCESS};
}
export function destroyMetasSuccess() {
  toastr.success('Eliminación exitosa.');
  return {type: DESTROY_META_SUCCESS};
}

export function stopAddingMetaSuccess() {
  return {type: STOP_ADD_META_SUCCESS};
}
export function startAddingMetaSuccess() {
  return {type: START_ADD_META_SUCCESS};
}
export function stopModalMetaSuccess() {
  return {type: STOP_MODAL_META_SUCCESS};
}
export function startModalMetaSuccess(metaModalId) {
  return {type: START_MODAL_META_SUCCESS, metaModalId};
}

export function loadMetas() {
  return dispatch => {
    return MetaApi.getAllMetas().then(metas => {
      dispatch(loadMetasSuccess(metas.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}
export function loadOneAreaMetas(area_id) {
  return dispatch => {
    return MetaApi.getOneAreaMetas(area_id).then(metas => {
      dispatch(loadOneAreaMetasSuccess(metas.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateMeta(meta) {
  return dispatch => {
    return MetaApi.updateMeta(meta).then(() => {
      dispatch(updateMetasSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function createMeta(meta) {
  return dispatch => {
    return MetaApi.createMeta(meta).then(() => {
      dispatch(createMetasSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyMeta(meta) {
  return dispatch => {
    return MetaApi.destroyMeta(meta.id).then(() => {
      dispatch(destroyMetasSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function startAddingMeta() {
  return dispatch => {
    return dispatch(startAddingMetaSuccess());
  };
}

export function stopAddingMeta() {
  return dispatch => {
    return dispatch(stopAddingMetaSuccess());
  };
}

export function startModalMeta(metaModalId) {
  return dispatch => {
    return dispatch(startModalMetaSuccess(metaModalId));
  };
}

export function stopModalMeta() {
  return dispatch => {
    return dispatch(stopModalMetaSuccess());
  };
}
