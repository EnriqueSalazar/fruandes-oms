import LogApi from '../api/LogApi';

export const LOAD_LOG_SUCCESS = 'LOAD_LOG_SUCCESS';


export function loadLogSuccess(log) {
  return {type: LOAD_LOG_SUCCESS, log};
}


export function loadLog() {
  return dispatch => {
    return LogApi.getAllLog().then(log => {
      dispatch(loadLogSuccess(log.data.result));
    }).catch(error => {
      throw(error);
    });
  };
}

