
import {
  LOAD_PERMISOS_SUCCESS,
  LOAD_ONE_PERMISOS_SUCCESS,
  CREATE_PERMISO_SUCCESS,
  UPDATE_PERMISO_SUCCESS,
  DESTROY_PERMISO_SUCCESS,
  STOP_ADD_PERMISO_SUCCESS,
  START_ADD_PERMISO_SUCCESS,
  UPDATE_PERMISO_RENDER_OPTIONS_SUCCESS
} from '../actions/permisoActions';

export default function permisoReducer(state = {
  permisos: [],
  shouldUpdatePermisos: false,
  renderOptions: {},
  onePermisos: []
}, action) {
  switch (action.type) {
    case UPDATE_PERMISO_RENDER_OPTIONS_SUCCESS:
      return  Object.assign({}, state,
      {renderOptions: action.renderOptions});
    case CREATE_PERMISO_SUCCESS:
    case DESTROY_PERMISO_SUCCESS:
    case UPDATE_PERMISO_SUCCESS:
      return Object.assign({}, state,
        {shouldUpdatePermisos: true});
    case LOAD_PERMISOS_SUCCESS:
      return Object.assign({}, state,
        {permisos: action.permisos,
          shouldUpdatePermisos: false});
   case LOAD_ONE_PERMISOS_SUCCESS:
      return Object.assign({}, state,
        {onePermisos: action.onePermisos});
    case START_ADD_PERMISO_SUCCESS:
      return Object.assign({}, state,
        {isAddingPermiso: true});
    case STOP_ADD_PERMISO_SUCCESS:
      return Object.assign({}, state,
        {isAddingPermiso: false});
    default:
      return state;
  }
}

