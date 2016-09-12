/**
 * Created by enriq on 6/09/16.
 */
import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';

import Areas from './src/client/containers/Areas';
import Log from './src/client/containers/Log';
import App from './src/client/containers/App';
import Home from './src/client/containers/Home';
import eya from './src/client/containers/eya';
import Users from './src/client/containers/Users';
import Permisos from './src/client/containers/Permisos';
import Recurrentes from './src/client/containers/Recurrentes';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/taskspage/:type/:selectedAreaId/:selectedMetaId/:selectedTareaId" component={Areas}/>
    <Route path="/users/:admin" component={Users}/>
    <Route path="/preferences/:admin" component={Users}/>
    <Route path="/permisos" component={Permisos}/>
    <Route path="/recurrentes" component={Recurrentes}/>
    <Route path="/log" component={Log}/>
  </Route>
);
