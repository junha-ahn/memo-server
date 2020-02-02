const {
  success,
  fail
} = require('./response')

const create = result => {
  try {
    return success.crud.createItem(result)
  } catch (err) {
    throw err
  }
}


module.exports = {
  create,
};