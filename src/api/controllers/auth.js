const {
  container
} = $require('api/middlewares');

exports.me = container(async req => {});

exports.signin = container(async req => {});

exports.signup = container(async req => {});

exports.logout = container(async req => {});

exports.existsEmail = container(async req => {});

exports.deleteAccount = container(async req => {});