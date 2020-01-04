const router = app => {
  app.use("/auth", require("./auth"));

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
};

module.exports = router;