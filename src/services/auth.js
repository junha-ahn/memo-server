const {
  bcrypt,
  token,
} = $require('helpers');

module.exports = class UserService {
  constructor(container) {
    this.userModel = container.get('userModel');
    this.logger = container.get('logger');
  }
  async SignUp({
    name,
    email,
    password,
  }) {
    this.logger.silly('Hashing password');
    const hashedPassword = await bcrypt.hashSync(password);
    this.logger.silly('Creating user db record');
    const userRecord = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const user = userRecord.toObject();
    Reflect.deleteProperty(user, 'password');
    return user
  }
  async SignIn(email, password) {

  }
}