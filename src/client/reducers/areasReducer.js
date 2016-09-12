
import {
  LOAD_AREAS_SUCCESS,
  CREATE_AREA_SUCCESS,
  UPDATE_AREA_SUCCESS,
  DESTROY_AREA_SUCCESS,
  STOP_ADD_AREA_SUCCESS,
  START_ADD_AREA_SUCCESS,
  START_MODAL_AREA_SUCCESS,
  STOP_MODAL_AREA_SUCCESS,
  UPDATE_AREA_RENDER_OPTIONS_SUCCESS
} from '../actions/areaActions';

export default function areaReducer(state = {
  areas: [],
  isAddingArea: false,
  shouldUpdateAreas: false,
  renderOptions: {},
  areaModalId: 0
}, action) {
  switch (action.type) {
    case UPDATE_AREA_RENDER_OPTIONS_SUCCESS:
      return  Object.assign({}, state,
      {renderOptions: action.renderOptions});
    case CREATE_AREA_SUCCESS:
    case DESTROY_AREA_SUCCESS:
    case UPDATE_AREA_SUCCESS:
      return Object.assign({}, state,
        {shouldUpdateAreas: true});
    case LOAD_AREAS_SUCCESS:
      return Object.assign({}, state,
        {areas: action.areas,
          shouldUpdateAreas: false});
    case START_ADD_AREA_SUCCESS:
      return Object.assign({}, state,
        {isAddingArea: true});
    case STOP_ADD_AREA_SUCCESS:
      return Object.assign({}, state,
        {isAddingArea: false});
    case START_MODAL_AREA_SUCCESS:
      return Object.assign({}, state,
        {areaModalId: action.areaModalId});
    case STOP_MODAL_AREA_SUCCESS:
      return Object.assign({}, state,
        {areaModalId: 0});
    default:
      return state;
  }
}

