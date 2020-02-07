const getSkip = (pageNum, pageLength) => (pageNum - 1) * pageLength;

// actions => getAction, countAction
const getAndCnt = (...actions) => new Promise((resolve, reject) => {
  Promise.all(actions).then(([rows, count]) => resolve({
    rows,
    count,
  }))
})
module.exports = {
  getSkip,
  getAndCnt,
}