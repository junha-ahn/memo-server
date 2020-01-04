const router = require("express").Router();
const {
  test
} = $require("controllers/auth");

router.get("/test", test);

module.exports = router;