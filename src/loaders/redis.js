const client = require('redis').createClient();

module.exports = {
  client,
  set(key, value, expire_sec) {
    if (expire_sec) {
      client.set(key, value, 'EX', expire_sec);
    } else {
      client.set(key, value);
    }
  },
  get(key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      });
    })
  },
};