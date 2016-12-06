
import {
  LOAD_LOG_SUCCESS,

} from '../actions/logActions';

export default function logReducer(state = {
  log: [],
  shouldUpdateLog: false
}, action) {
  switch (action.type) {
    case LOAD_LOG_SUCCESS:
      return Object.assign({}, state,
        {log: action.log,
          shouldUpdateLog: false});
    default:
      return state;
  }
}

