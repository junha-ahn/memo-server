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
const getItem = result => {
  try {
    return result ?
      success.crud.getItem(result) :
      fail.crud.notFound()
  } catch (err) {
    throw err
  }
}


module.exports = {
  create,
  getItem,
};