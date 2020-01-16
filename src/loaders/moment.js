const moment = require('moment-timezone')
const TZ = 'UTC'

const parseMomentDateTime = input => moment(input).tz(TZ)

module.exports = parseMomentDateTime