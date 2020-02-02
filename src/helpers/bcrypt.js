const bcrypt = require('bcryptjs');

module.exports = {
  compareSync: (plainTextPassword, hash) => bcrypt.compareSync(plainTextPassword, hash),
  hashSync: plainTextPassword => bcrypt.hashSync(plainTextPassword, bcrypt.genSaltSync(10)),
}