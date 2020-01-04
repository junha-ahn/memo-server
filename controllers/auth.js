const authService = $require("services/auth");

exports.test = (req, res, next) => {
  const message = authService.test();
  res.status(200).json({
    message
  })
};