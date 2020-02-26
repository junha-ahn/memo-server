const validator = require("express-validator");
const mongoose = require('mongoose');

const isObjectId = (value) => mongoose.Types.ObjectId.isValid(value)

exports._id = validator
  .param("_id")
  .optional()
  .custom(isObjectId);
exports.name = validator.body("name").isLength({
  min: 2,
  max: 20
});
exports.email = validator.body("email").isEmail();
exports.password = validator.body("password").isLength({
  min: 4,
  max: 20
});

exports.pageNum = validator.query("pageNum").isInt();
exports.pageLength = validator.query("pageLength").isInt();

exports.getterValidations = [
  validator
  .param("_id")
  .optional().custom(isObjectId),
  validator.query('pageNum').toInt().custom((value, {
    req
  }) => {
    if (req.params._id !== undefined) return true;
    if (isNaN(value)) return false;
    return true;
  }),
  validator.query('pageLength').toInt().custom((value, {
    req
  }) => {
    if (req.params._id !== undefined) return true;
    if (isNaN(value)) return false;
    const MAX = 1000;
    if (value > MAX) return false;
    return true;
  }),
];