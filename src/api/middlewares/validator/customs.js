const moment = $require("loaders/moment");

exports.isDate = (value, {
  req
}) => {
  if (value == null) return false;
  const result = moment(value, moment.ISO_8601, true).isValid();
  return result;
};