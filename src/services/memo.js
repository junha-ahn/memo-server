const {
  bcrypt,
  token
} = $require("helpers");
const {
  fail
} = $require("api/middlewares");
const {
  getSkip,
  getAndCnt,
  trimObject
} = $require("helpers/db");

module.exports = class MemoService {
  constructor(container) {
    this.memoModel = container.get("memoModel");
    this.logger = container.get("logger");
  }
  get(_id) {
    return (userId, {
      pageLength,
      pageNum,
      tagIds
    }) => {
      const query = {
        userId,
        ...trimObject({
          tags: tagIds
        })
      };

      return new Promise((resolve) => {
        if (_id) {
          return this.memoModel.findOne({
              _id,
              userId
            })
            .populate({
              path: 'tags',
              populate: {
                path: 'tags'
              }
            })
            .exec((_, data) => resolve(data))
        }
        this.memoModel
          .find(query)
          .limit(pageLength)
          .skip(getSkip(pageNum, pageLength))
          .populate({
            path: 'tags',
            populate: {
              path: 'tags'
            }
          })
          .exec((_, rows) => {
            const count = this.memoModel.countDocuments(query)
            resolve(getAndCnt(rows, count))
          })
      })
    };
  }
  async create(userId, {
    isFixed,
    title,
    content,
    tags = []
  }) {
    this.logger.silly("Creating memo db record");
    const memoRecord = await this.memoModel.create({
      userId,
      isFixed,
      title,
      content,
      tags
    });
    const memo = memoRecord.toObject();
    return memo;
  }
  async update(_id, userId, {
    isFixed,
    title,
    content,
    tags = []
  }) {
    this.logger.silly("Updating memo db record");
    const result = await this.memoModel.updateOne({
      _id,
      userId
    }, {
      isFixed,
      title,
      content,
      tags
    });
    return result;
  }
  async delete(_id, userId) {
    this.logger.silly("Deleting memo db record");
    const result = await this.memoModel.deleteOne({
      _id,
      userId
    });
    return result;
  }
};