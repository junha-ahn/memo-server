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
    const clientVerifier = new Date().valueOf()
    const userRecord = await this.userModel.findOne({
      email
    });
    const user = userRecord.toObject();
    this.logger.silly('Checking password');
    const validPassword = await bcrypt.compareSync(password, user.password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');

      Reflect.deleteProperty(user, 'password');
      return {
        user,
        token: await token.generateToken(user, clientVerifier),
        clientVerifier,
      };
    } else {
      // error 처리!!
    }
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
    if (validPassword) {
      this.logger.silly('Password is valid!');
      return await this.userModel.deleteOne({
        _id
      })
    } else {

    }
  }
}