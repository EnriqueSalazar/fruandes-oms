import {
  LOAD_USUARIOS_SUCCESS,
  CREATE_USUARIO_SUCCESS,
  UPDATE_USUARIO_SUCCESS,
  DESTROY_USUARIO_SUCCESS,
  STOP_ADD_USUARIO_SUCCESS,
  START_ADD_USUARIO_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS
} from '../actions/usuarioActions';

export default function usuarioReducer(state = {
  usuarios: [],
  authUser: 0,
  isAddingUsuario: false,
  shouldUpdateUsuarios: false
}, action) {
  switch (action.type) {
    case CREATE_USUARIO_SUCCESS:
    case DESTROY_USUARIO_SUCCESS:
    case UPDATE_USUARIO_SUCCESS:
      return Object.assign({}, state,
        {shouldUpdateUsuarios: true});
    case LOAD_USUARIOS_SUCCESS:
      return Object.assign({}, state,
        {
          usuarios: action.usuarios,
          shouldUpdateUsuarios: false
        });
    case START_ADD_USUARIO_SUCCESS:
      return Object.assign({}, state,
        {isAddingUsuario: true});
    case STOP_ADD_USUARIO_SUCCESS:
      return Object.assign({}, state,
        {isAddingUsuario: false});
    case LOGIN_USER_SUCCESS:
      localStorage.setItem('authUser_oms', action.authUser);
      return Object.assign({}, state,
        {authUser: action.authUser, shouldUpdateUsuarios: true});
    case LOGOUT_USER_SUCCESS:
      localStorage.setItem('authUser_oms', 0);
      return Object.assign({}, state,
        {authUser: 0, shouldUpdateUsuarios: true});
    default:
      return state;
  }
}

