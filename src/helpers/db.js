const _ = require('lodash')
const {
  produce
} = require("immer");
const getSkip = (pageNum, pageLength) => (pageNum - 1) * pageLength;

// actions => getAction, countAction
const getAndCnt = (...actions) =>
  new Promise((resolve, reject) => {
    Promise.all(actions).then(([rows, count]) => {
      resolve({
        rows,
        count
      })
    });
  });

const trimObject = src =>
  produce(src, draft => {
    _.forEach(_.toPairs(draft), ([key, value]) => {
      if (value === undefined) delete draft[key];
    })
  });

module.exports = {
  getSkip,
  getAndCnt,
  trimObject
};