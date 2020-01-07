const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const cors = require("cors");
// const connect = require('./src/loaders/mongoose');
const config = $require('config')
const routes = $require('controllers')

module.exports = app => {
  app.use(helmet());
  app.use(helmet.noCache());
  app.use(compression());
  app.use(cors());
  
  app.use(cookieParser(process.env.COOKE_SECRET));
  app.use(morgan(process.env.NODE_ENV == 'production' ? 'combined' : 'dev'));
  
  app.use(bodyParser.urlencoded({
    extended: false,
  }));
  
  app.use(bodyParser.json());
  
  app.use(config.api.prefix, routes());

  app.all("*", (req, res, next) => {
    const err = new Error(`Not Found!`);
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err ? err.status : 500).json({
      err,
    })
  })
}