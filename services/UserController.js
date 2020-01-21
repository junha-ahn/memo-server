const UserRepository = $require('db/models/repositories/UserRepository');

exports.createUser = (req) => {
  const user = req.body;

  UserRepository.create(user)
    .then((newUser) => {
      res.json(newUser);
    }).catch((errors) => {
      res.status(500).json({
        errors,
      });
    });
}