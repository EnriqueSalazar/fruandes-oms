
import {
  LOAD_RECURRENTES_SUCCESS,
  LOAD_ACTIVE_RECURRENTES_SUCCESS,
  LOAD_DONE_RECURRENTES_SUCCESS,
  CREATE_RECURRENTE_SUCCESS,
  DONE_RECURRENTE_SUCCESS,
  UPDATE_RECURRENTE_SUCCESS,
  DESTROY_RECURRENTE_SUCCESS,
  STOP_ADD_RECURRENTE_SUCCESS,
  START_ADD_RECURRENTE_SUCCESS,
  START_MODAL_RECURRENTE_SUCCESS,
  STOP_MODAL_RECURRENTE_SUCCESS
} from '../actions/recurrenteActions';

export default function recurrenteReducer(state = {
  recurrentes: [],
  active: [],
  done: [],
  isAddingRecurrente: false,
  shouldUpdateRecurrentes: false,
  recurrenteModalId: 0
}, action) {
  switch (action.type) {
    case LOAD_DONE_RECURRENTES_SUCCESS:
      return Object.assign({}, state,
        {done: action.done,
          shouldUpdateRecurrentes: false});
    case DONE_RECURRENTE_SUCCESS:
    case CREATE_RECURRENTE_SUCCESS:
    case DESTROY_RECURRENTE_SUCCESS:
    case UPDATE_RECURRENTE_SUCCESS:
      return Object.assign({}, state,
        {shouldUpdateRecurrentes: true});
    case LOAD_RECURRENTES_SUCCESS:
      return Object.assign({}, state,
        {recurrentes: action.recurrentes,
          shouldUpdateRecurrentes: false});
    case LOAD_ACTIVE_RECURRENTES_SUCCESS:
      return Object.assign({}, state,
        {active: action.active,
          shouldUpdateRecurrentes: false});
    case START_ADD_RECURRENTE_SUCCESS:
      return Object.assign({}, state,
        {isAddingRecurrente: true});
    case STOP_ADD_RECURRENTE_SUCCESS:
      return Object.assign({}, state,
        {isAddingRecurrente: false});
    case START_MODAL_RECURRENTE_SUCCESS:
      return Object.assign({}, state,
        {recurrenteModalId: action.recurrenteModalId});
    case STOP_MODAL_RECURRENTE_SUCCESS:
      return Object.assign({}, state,
        {recurrenteModalId: 0});
    default:
      return state;
  }
}

