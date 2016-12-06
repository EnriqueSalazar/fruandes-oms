import {toastr} from 'react-redux-toastr';
import AreaApi from '../api/AreaApi';

export const LOAD_AREAS_SUCCESS = 'LOAD_AREAS_SUCCESS';
export const CREATE_AREA_SUCCESS = 'CREATE_AREA_SUCCESS';
export const UPDATE_AREA_SUCCESS = 'UPDATE_AREA_SUCCESS';
export const DESTROY_AREA_SUCCESS = 'DESTROY_AREA_SUCCESS';
export const STOP_ADD_AREA_SUCCESS = 'STOP_ADD_AREA_SUCCESS';
export const START_ADD_AREA_SUCCESS = 'START_ADD_AREA_SUCCESS';
export const STOP_MODAL_AREA_SUCCESS = 'STOP_MODAL_AREA_SUCCESS';
export const START_MODAL_AREA_SUCCESS = 'START_MODAL_AREA_SUCCESS';
export const UPDATE_AREA_RENDER_OPTIONS_SUCCESS = 'UPDATE_AREA_RENDER_OPTIONS_SUCCESS';

export function loadAreasSuccess(areas) {
  return {type: LOAD_AREAS_SUCCESS, areas};
}
export function updateRenderOptionsSuccess(renderOptions) {
  return {type: UPDATE_AREA_RENDER_OPTIONS_SUCCESS, renderOptions};
}
export function updateAreasSuccess() {
  toastr.success('Actualización exitosa.');
  return {type: UPDATE_AREA_SUCCESS};
}
export function createAreasSuccess() {
  toastr.success('Creación exitosa.');
  return {type: CREATE_AREA_SUCCESS};
}
export function destroyAreasSuccess() {
  toastr.success('Eliminación exitosa.');
  return {type: DESTROY_AREA_SUCCESS};
}

export function stopAddingAreaSuccess() {
  return {type: STOP_ADD_AREA_SUCCESS};
}
export function startAddingAreaSuccess() {
  return {type: START_ADD_AREA_SUCCESS};
}
export function stopModalAreaSuccess() {
  return {type: STOP_MODAL_AREA_SUCCESS};
}
export function startModalAreaSuccess(areaModalId) {
  return {type: START_MODAL_AREA_SUCCESS, areaModalId};
}

export function loadAreas() {
  return dispatch => {
    return AreaApi.getAllAreas().then(areas => {
      dispatch(loadAreasSuccess(areas.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}
export function updateArea(area) {
  return dispatch => {
    return AreaApi.updateArea(area).then(() => {
      dispatch(updateAreasSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}
export function createArea(area) {
  return dispatch => {
    return AreaApi.createArea(area).then(() => {
      dispatch(createAreasSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function destroyArea(area) {
  return dispatch => {
    return AreaApi.destroyArea(area.id).then(() => {
      dispatch(destroyAreasSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function startAddingArea() {
  return dispatch => {
    return dispatch(startAddingAreaSuccess());
  };
}

export function stopAddingArea() {
  return dispatch => {
    return dispatch(stopAddingAreaSuccess());
  };
}

export function updateRenderOptions(renderOptions) {
  return dispatch => {
    return dispatch(updateRenderOptionsSuccess(renderOptions));
  };
}

export function startModalArea(areaModalId) {
  return dispatch => {
    return dispatch(startModalAreaSuccess(areaModalId));
  };
}

export function stopModalArea() {
  return dispatch => {
    return dispatch(stopModalAreaSuccess());
  };
}
