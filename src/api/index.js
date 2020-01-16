const {
  Router
} = require('express');

const router = () => {
  const app = Router();
  require('./routes/test')(app);
  require('./routes/auth')(app);
  require('./routes/memo')(app);

  return app;
};

module.exports = router;