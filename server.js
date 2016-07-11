const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const areas = require('./server/routes/areasRoute');
const metas = require('./server/routes/metasRoute');
const tareas = require('./server/routes/tareasRoute');
const usuarios = require('./server/routes/usuariosRoute');
const comentariosAreasRoute = require('./server/routes/comentariosAreasRoute');

const app = new (require('express'))();
const port = 3000;

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.use('/areas', areas);
app.use('/metas', metas);
app.use('/tareas', tareas);
app.use('/usuarios', usuarios);
app.use('/comentariosareas', comentariosAreasRoute);

app.get("/*", function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(error) {
  if (error) {
    console.error(error); // eslint-disable-line
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);// eslint-disable-line
  }
});
