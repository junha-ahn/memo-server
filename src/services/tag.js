const {
  bcrypt,
  token,
} = $require('helpers');;
const {
  fail,
} = $require('api/middlewares');
const {
  getSkip,
  getAndCnt,
} = $require('helpers/db');


module.exports = class TagService {
  constructor(container) {
    this.tagModel = container.get('tagModel');
    this.logger = container.get('logger');
  }
  get(_id) {
    return (userId, {
      pageLength,
      pageNum,
    }) => {
      const query = {
        userId,
      }
      return _id ? this.tagModel.findOne({
          _id,
          userId,
        }) :
        getAndCnt(this.tagModel.find(query)
          .limit(pageLength)
          .skip(getSkip(pageNum, pageLength)),
          this.tagModel.countDocuments(query))
    }
  }

  async create(userId, {
    name,
  }) {
    this.logger.silly('Creating tag db record');
    const tagRecord = await this.tagModel.create({
      userId,
      name,
    });
    const tag = tagRecord.toObject();
    return tag
  }
  async update(_id, userId, {
    name,
  }) {
    this.logger.silly('Updating tag db record');
    const result = await this.tagModel.updateOne({
      _id,
      userId,
    }, {
      name,
    });
    return result
  }
  async delete(_id, userId) {
    this.logger.silly('Deleting tag db record');
    // Memo -> delete TagIds?...
    const result = await this.tagModel.deleteOne({
      _id,
      userId,
    });
    return result
  }

}