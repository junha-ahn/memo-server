const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');

app.use(helmet());
app.use(helmet.noCache());
app.use(compression());

app.use(cookieParser(process.env.COOKE_SECRET));
app.use(morgan(process.env.NODE_ENV == 'production' ? 'combined' : 'dev'));

app.use(bodyParser.urlencoded({
	extended: false,
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.status(200).json({
    message: 'Hello World'
  })
});


module.exports = app;