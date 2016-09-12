/**
 * Created by enriq on 6/09/16.
 */
import { combineReducers } from 'redux';
import {
  syncHistoryWithStore,
  routerReducer
} from 'react-router-redux';
import
  ReduxToastr,
{
  reducer as toastrReducer
} from 'react-redux-toastr';
import {reducer as formReducer} from 'redux-form';
import logReducer from './logReducer';
import areasReducer from './areasReducer';
import tareasReducer from './tareasReducer';
import metasReducer from './metasReducer';
import usuariosReducer from './usuariosReducer';
import permisosReducer from './permisosReducer';
import comentariosAreasReducer from './comentariosAreasReducer';
import recurrentesReducer from './recurrentesReducer';

const appReducers = combineReducers({
  logReducer,
  areasReducer,
  metasReducer,
  tareasReducer,
  usuariosReducer,
  permisosReducer,
  comentariosAreasReducer,
  recurrentesReducer,
  routing: routerReducer,
  toastr: toastrReducer,
  form: formReducer
});

export default appReducers;
