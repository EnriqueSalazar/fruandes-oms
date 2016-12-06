import {
  LOAD_COMENTARIOS_AREAS_SUCCESS,
  CREATE_COMENTARIOS_AREA_SUCCESS,
  UPDATE_COMENTARIOS_AREA_SUCCESS,
  DESTROY_COMENTARIOS_AREA_SUCCESS,
} from '../actions/comentariosAreaActions';

export default function comentariosAreaReducer(state = {
  comentariosAreas: [],
  shouldUpdateComentariosAreas: false
}, action) {
  switch (action.type) {
    case CREATE_COMENTARIOS_AREA_SUCCESS:
    case DESTROY_COMENTARIOS_AREA_SUCCESS:
    case UPDATE_COMENTARIOS_AREA_SUCCESS:
      return Object.assign({}, state,
        {shouldUpdateComentariosAreas: true});
    case LOAD_COMENTARIOS_AREAS_SUCCESS:
      return Object.assign({}, state,
        {
          comentariosAreas: action.comentariosAreas,
          shouldUpdateComentariosAreas: false
        });
    default:
      return state;
  }
}

