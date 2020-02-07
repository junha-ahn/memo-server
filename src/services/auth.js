const {
  bcrypt,
  token,
} = $require('helpers');;
const {
  fail,
} = $require('api/middlewares');

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
    const userRecord = await this.userModel.findOne({
      email
    });
    if (!userRecord) throw fail.auth.login();
    const user = userRecord.toObject();
    this.logger.silly('Checking password');
    const validPassword = await bcrypt.compareSync(password, user.password);
    if (!validPassword) throw fail.auth.login();
    this.logger.silly('Password is valid!');
    const clientVerifier = new Date().valueOf()
    Reflect.deleteProperty(user, 'password');
    this.logger.silly('Generating JWT');
    return {
      user,
      token: await token.generateToken(user, clientVerifier),
      clientVerifier,
    };
  }
  async FindEmail(email) {
    const userRecord = await this.userModel.findOne({
      email
    });
    return userRecord;
  }
  async deleteUser(_id, password) {
    const userRecord = await this.userModel.findOne({
      _id
    });
    const user = userRecord.toObject();
    this.logger.silly('Checking password');
    const validPassword = await bcrypt.compareSync(password, user.password);
    if (!validPassword) throw fail.auth.login();
    this.logger.silly('Password is valid!');
    return await this.userModel.deleteOne({
      _id
    })
  }
}