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

const remove = result => {
  try {
    return result && result.deletedCount ?
      success.crud.deleteItem() :
      fail.crud.notFound()
  } catch (err) {
    throw err
  }
}

const getItem = async data => {
  try {
    const result = await data
    return result ?
      success.crud.getItem(result) :
      fail.crud.notFound()
  } catch (err) {
    throw err
  }
}
const getItems = async data => {
  try {
    const result = await data
    return success.crud.getItems(result.rows, result.count)
  } catch (err) {
    throw err
  }
}

const get = _id => async data => {
  try {
    return await _id ? getItem(data) : getItems(data)
  } catch (err) {
    throw err
  }
}

module.exports = {
  create,
  delete: remove,
  getItem,
  getItems,
  get,
};