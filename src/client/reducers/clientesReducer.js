
import {
  LOAD_CLIENTES_SUCCESS,
  CREATE_CLIENTES_SUCCESS,
  UPDATE_CLIENTES_SUCCESS,
  DESTROY_CLIENTES_SUCCESS,
  STOP_ADD_CLIENTES_SUCCESS,
  START_ADD_CLIENTES_SUCCESS,
  START_MODAL_CLIENTES_SUCCESS,
  STOP_MODAL_CLIENTES_SUCCESS,
  UPDATE_CLIENTES_RENDER_OPTIONS_SUCCESS
} from '../actions/clientesActions';

export default function clientesReducer(state = {
  clientes: [],
  isAddingClientes: false,
  shouldUpdateClientes: false,
  renderOptions: {},
  clientesModalId: 0
}, action) {
  switch (action.type) {
    case UPDATE_CLIENTES_RENDER_OPTIONS_SUCCESS:
      return  Object.assign({}, state,
      {renderOptions: action.renderOptions});
    case CREATE_CLIENTES_SUCCESS:
    case DESTROY_CLIENTES_SUCCESS:
    case UPDATE_CLIENTES_SUCCESS:
      return Object.assign({}, state,
        {shouldUpdateClientes: true});
    case LOAD_CLIENTES_SUCCESS:
      return Object.assign({}, state,
        {clientes: action.clientes,
          shouldUpdateClientes: false});
    case START_ADD_CLIENTES_SUCCESS:
      return Object.assign({}, state,
        {isAddingClientes: true});
    case STOP_ADD_CLIENTES_SUCCESS:
      return Object.assign({}, state,
        {isAddingClientes: false});
    case START_MODAL_CLIENTES_SUCCESS:
      return Object.assign({}, state,
        {clientesModalId: action.clientesModalId});
    case STOP_MODAL_CLIENTES_SUCCESS:
      return Object.assign({}, state,
        {clientesModalId: 0});
    default:
      return state;
  }
}



