import {
  LOAD_CUSTOM_SUCCESS,
  CREATE_CUSTOM_SUCCESS,
  UPDATE_CUSTOM_SUCCESS,
  DESTROY_CUSTOM_SUCCESS,
  STOP_ADD_CUSTOM_SUCCESS,
  START_ADD_CUSTOM_SUCCESS,
  START_MODAL_CUSTOM_SUCCESS,
  STOP_MODAL_CUSTOM_SUCCESS,
  UPDATE_CUSTOM_RENDER_OPTIONS_SUCCESS
} from '../actions/customActions';

export default function customReducer(state = {
  custom: [],
  isAddingCustom: false,
  shouldUpdateCustom: false,
  renderOptions: {},
  customModalId: 0
}, action) {
  switch (action.type) {
    case UPDATE_CUSTOM_RENDER_OPTIONS_SUCCESS:
      return  Object.assign({}, state,
      {renderOptions: action.renderOptions});
    case CREATE_CUSTOM_SUCCESS:
    case DESTROY_CUSTOM_SUCCESS:
    case UPDATE_CUSTOM_SUCCESS:
      return Object.assign({}, state,
        {shouldUpdateCustom: true});
    case LOAD_CUSTOM_SUCCESS:
      return Object.assign({}, state,
        {custom: action.custom,
          shouldUpdateCustom: false});
    case START_ADD_CUSTOM_SUCCESS:
      return Object.assign({}, state,
        {isAddingCustom: true});
    case STOP_ADD_CUSTOM_SUCCESS:
      return Object.assign({}, state,
        {isAddingCustom: false});
    case START_MODAL_CUSTOM_SUCCESS:
      return Object.assign({}, state,
        {customModalId: action.customModalId});
    case STOP_MODAL_CUSTOM_SUCCESS:
      return Object.assign({}, state,
        {customModalId: 0});
    default:
      return state;
  }
}



