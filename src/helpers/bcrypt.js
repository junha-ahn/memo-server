const bcrypt = require('bcryptjs');

module.exports = {
  compareSync(plainTextPassword, hash) {
    return bcrypt.compareSync(plainTextPassword, hash);
  },
  hashSync(plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, Number(process.env.SALT_ROUNDS));
  },
}