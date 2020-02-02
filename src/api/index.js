const {
  Router
} = require('express');
const {
  attachCurrentUser
} = $require('api/middlewares')

const router = () => {
  const app = Router();
  app.use(attachCurrentUser);
  require('./routes/auth')(app);
  require('./routes/memo')(app);
  return app;
};

module.exports = router;