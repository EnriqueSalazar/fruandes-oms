const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const log = require('./src/server/routes/logRoute');
const areas = require('./src/server/routes/areasRoute');
<<<<<<< HEAD
const clientes = require('./src/server/routes/clientesRoute');
const custom = require('./src/server/routes/customRoute');
=======
>>>>>>> 5431cd70ffe1299da22486f46fe6d038724b7ffc
const metas = require('./src/server/routes/metasRoute');
const tareas = require('./src/server/routes/tareasRoute');
const usuarios = require('./src/server/routes/usuariosRoute');
const permisos = require('./src/server/routes/permisosRoute');
const recurrentes = require('./src/server/routes/recurrentesRoute');
const recurrentesDone = require('./src/server/routes/recurrentesDoneRoute');
const comentariosAreasRoute = require('./src/server/routes/comentariosAreasRoute');
const config = require('./webpack.config');

const isDeveloping = process.env.NODE_ENV !== 'production';
const app = express();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });

} else {
  app.get('*.min.js', function (req, res, next) {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  });
  app.use(express.static(__dirname + '/dist'));

  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

console.info('Server environment', process.env.NODE_ENV);

app.use('/log', log);
app.use('/areas', areas);
<<<<<<< HEAD
app.use('/clientes', clientes);
app.use('/custom', custom);
=======
>>>>>>> 5431cd70ffe1299da22486f46fe6d038724b7ffc
app.use('/metas', metas);
app.use('/tareas', tareas);
app.use('/usuarios', usuarios);
app.use('/permisos', permisos);
app.use('/recurrentes', recurrentes);
app.use('/recurrentesDone', recurrentesDone);
app.use('/comentariosareas', comentariosAreasRoute);

const port = isDeveloping ? 3000 : 80;
app.listen(port, function (error) {
  if (error) {
    console.error(error); // eslint-disable-line
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);// eslint-disable-line
  }
});
