const { Router } = require('express');

const router = () => {
	const app = Router();
  require('./routes/auth')(app);
  
  return app;
};

module.exports = router;