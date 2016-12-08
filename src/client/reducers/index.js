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
<<<<<<< HEAD
import clientesReducer from './clientesReducer';
import customReducer from './customReducer';
=======
>>>>>>> 5431cd70ffe1299da22486f46fe6d038724b7ffc
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
<<<<<<< HEAD
  clientesReducer,
  customReducer,
=======
>>>>>>> 5431cd70ffe1299da22486f46fe6d038724b7ffc
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
