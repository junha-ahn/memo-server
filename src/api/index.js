const { Router } = require('express');

const router = () => {
	const app = Router();
  require('./routes/test')(app);
  
  return app;
};

module.exports = router;