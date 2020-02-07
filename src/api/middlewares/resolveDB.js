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

const update = async data => {
  try {
    const result = await data
    return result.ok ? success.crud.updateItem() : fail.error.BadRequest('변경이 사항 없습니다', result)
  } catch (err) {
    throw err
  }
}

const remove = async data => {
  try {
    const result = await data
    return result && result.ok ?
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
  update,
  getItem,
  getItems,
  get,
};