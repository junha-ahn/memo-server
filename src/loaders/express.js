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

module.exports = app => {
  app.use(helmet());
  app.use(helmet.noCache());
  app.use(cors());

  app.use(cookieParser(process.env.COOKE_SECRET));
  app.use(
    session({
      secret: process.env.COOKE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        secure: false
      },
      store: process.env.REDIS_ENABLE === 1 ?
        store : new RedisStore({
          client: redisClient,
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          logErrors: true,
          ttl: 60 * 60 * 24 // in seconds (redis will delete automatically)
        })
    })
  );
  app.use(morgan(process.env.NODE_ENV == "production" ? "combined" : "dev"));

  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );

  app.use(bodyParser.json());

  app.use(config.api.prefix, routes());

  app.all("*", (req, res, next) => {
    const err = new Error(`Not Found!`);
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err ? err.status : 500).json({
      err
    });
  });
};