const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const session = require("express-session");
const cors = require("cors");
const config = $require("config");
const routes = $require("api");
const RedisStore = require("connect-redis")(session);
const {
  client: redisClient
} = require("./redis");
const {
  sendResponse,
  fail
} = $require('api/middlewares')

module.exports = app => {
  app.use(helmet());
  app.use(helmet.noCache());
  app.use(cors());

  app.use(cookieParser(config.COOKIE_SECRET));
  app.use(
    session({
      secret: config.COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        secure: false
      },
      store: config.redis.enable === 1 ?
        store : new RedisStore({
          client: redisClient,
          host: config.redis.host,
          port: config.redis.port,
          logErrors: true,
          ttl: 60 * 60 * 24 // in seconds (redis will delete automatically)
        })
    })
  );
  app.use(morgan(config.NODE_ENV == "production" ? "combined" : "dev"));

  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );

  app.use(bodyParser.json());

  app.use(config.api.prefix, routes());


  app.use((req, res, next) => sendResponse(res)(
    fail.error.URLNotFound(req.originalUrl)
  ));

  app.use((err, req, res, next) => console.log(err) || sendResponse(res)(
    fail.error.internalError({
      errorMessage: err.message || ''
    })
  ));
};