
import {
  LOAD_METAS_SUCCESS,
  LOAD_ONE_AREA_METAS_SUCCESS,
  CREATE_META_SUCCESS,
  UPDATE_META_SUCCESS,
  DESTROY_META_SUCCESS,
  STOP_ADD_META_SUCCESS,
  START_ADD_META_SUCCESS,
  START_MODAL_META_SUCCESS,
  STOP_MODAL_META_SUCCESS
} from '../actions/metaActions';

export default function metaReducer(state = {
  metas: [],
  isAddingMeta: false,
  shouldUpdateMetas: false,
  metaModalId: 0
}, action) {
  switch (action.type) {
    case CREATE_META_SUCCESS:
    case DESTROY_META_SUCCESS:
    case UPDATE_META_SUCCESS:
      return Object.assign({}, state,
        {shouldUpdateMetas: true});
    case LOAD_ONE_AREA_METAS_SUCCESS:
    case LOAD_METAS_SUCCESS:
      return Object.assign({}, state,
        {metas: action.metas,
          shouldUpdateMetas: false});
    case START_ADD_META_SUCCESS:
      return Object.assign({}, state,
        {isAddingMeta: true});
    case STOP_ADD_META_SUCCESS:
      return Object.assign({}, state,
        {isAddingMeta: false});
    case START_MODAL_META_SUCCESS:
      return Object.assign({}, state,
        {metaModalId: action.metaModalId});
    case STOP_MODAL_META_SUCCESS:
      return Object.assign({}, state,
        {metaModalId: 0});
    default:
      return state;
  }
}

