
import {
  LOAD_TAREAS_SUCCESS,
  LOAD_ONE_AREA_TAREAS_SUCCESS,
  CREATE_TAREA_SUCCESS,
  UPDATE_TAREA_SUCCESS,
  DESTROY_TAREA_SUCCESS,
  STOP_ADD_TAREA_SUCCESS,
  START_ADD_TAREA_SUCCESS,
  START_MODAL_TAREA_SUCCESS,
  STOP_MODAL_TAREA_SUCCESS
} from '../actions/tareaActions';

export default function tareaReducer(state = {
  tareas: [],
  isAddingTarea: false,
  shouldUpdateTareas: false,
  tareaModalId: 0
}, action) {
  switch (action.type) {
    case CREATE_TAREA_SUCCESS:
    case DESTROY_TAREA_SUCCESS:
    case UPDATE_TAREA_SUCCESS:
      return Object.assign({}, state,
        {shouldUpdateTareas: true});
    case LOAD_ONE_AREA_TAREAS_SUCCESS:
    case LOAD_TAREAS_SUCCESS:
      return Object.assign({}, state,
        {tareas: action.tareas,
          shouldUpdateTareas: false});
    case START_ADD_TAREA_SUCCESS:
      return Object.assign({}, state,
        {isAddingTarea: true});
    case STOP_ADD_TAREA_SUCCESS:
      return Object.assign({}, state,
        {isAddingTarea: false});
    case START_MODAL_TAREA_SUCCESS:
      return Object.assign({}, state,
        {tareaModalId: action.tareaModalId});
    case STOP_MODAL_TAREA_SUCCESS:
      return Object.assign({}, state,
        {tareaModalId: 0});
    default:
      return state;
  }
}

