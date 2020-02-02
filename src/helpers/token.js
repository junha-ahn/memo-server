const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  verifyToken: token =>
    new Promise((resolve, reject) =>
      jwt.verify(token, SECRET_KEY, (error, data) =>
        error ? reject(error) : resolve(data)
      )
    ),
  generateToken: (data, clientVerifier) => {
    data.clientVerifier = clientVerifier;
    return new Promise((resolve, reject) =>
      jwt.sign(
        data,
        SECRET_KEY,
        {
          expiresIn: "7d"
        },
        (error, token) => (error ? reject(error) : resolve(token))
      )
    );
  },
  getToken(req) {
    const bearerHeader = req.headers.authorization;

    return (
      bearerHeader && bearerHeader.split(" ") && bearerHeader.split(" ")[1]
    );
  }
};
