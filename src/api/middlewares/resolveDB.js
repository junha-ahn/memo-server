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

const remove = result => {
  try {
    return result && result.deletedCount ?
      success.crud.deleteItem() :
      fail.crud.notFound()
  } catch (err) {
    throw err
  }
}

module.exports = {
  create,
  getItem,
  delete: remove,
};