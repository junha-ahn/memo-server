const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  logout: req => req.session.destroy(),
  verifyToken: token =>
    new Promise((resolve, reject) =>
      jwt.verify(token, SECRET_KEY, (error, data) =>
        error ? reject(error) : resolve(data)
      )
    ),
  generateToken: (data, clientVerifier) =>
    new Promise((resolve, reject) =>
      jwt.sign({
          ...data,
          clientVerifier,
        },
        SECRET_KEY, {
          expiresIn: '7d'
        },
        (error, token) => (error ? reject(error) : resolve(token))
      )
    ),
  getToken(req) {
    const bearerHeader = req.headers.authorization;
    return (
      bearerHeader && bearerHeader.split(' ') && bearerHeader.split(' ')[1]
    );
  }
};