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
}