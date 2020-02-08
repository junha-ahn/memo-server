const {
  bcrypt,
  token,
} = $require('helpers');;
const {
  fail,
} = $require('api/middlewares');

module.exports = class MemoService {
  constructor(container) {
    this.memoModel = container.get('memoModel');
    this.logger = container.get('logger');
  }
  async create(userId, {
    isFixed,
    title,
    content,
    tagIds,
  }) {
    this.logger.silly('Creating memo db record');
    const memoRecord = await this.memoModel.create({
      userId,
      isFixed,
      title,
      content,
      tagIds,
    });
    const memo = memoRecord.toObject();
    return memo
  }
  async update(_id, userId, {
    isFixed,
    title,
    content,
    tagIds,
  }) {
    this.logger.silly('Updating memo db record');
    const result = await this.memoModel.updateOne({
      _id,
      userId,
    }, {
      isFixed,
      title,
      content,
      tagIds,
    });
    return result
  }
  async delete(_id, userId) {
    this.logger.silly('Deleting memo db record');
    const result = await this.memoModel.deleteOne({
      _id,
      userId,
    });
    return result
  }
}