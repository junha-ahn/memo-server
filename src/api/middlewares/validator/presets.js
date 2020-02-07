const validator = require("express-validator");
const mongoose = require('mongoose');
exports.id = validator
  .param("id")
  .optional({
    nullable: true
  })
  .isInt();
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
  .optional({
    nullable: true
  }).custom((value) => mongoose.Types.ObjectId.isValid(value)),
  validator.query('pageNum').optional().toInt().isInt().custom((value, {
    req
  }) => {
    if (req.params._id !== undefined) return true;
    if (isNaN(Number(value))) return false;
    return true;
  }),
  validator.query('pageLength').optional().toInt().isInt().custom((value, {
    req
  }) => {
    if (req.params._id !== undefined) return true;
    if (isNaN(Number(value))) return false;
    const MAX = 1000;
    if (value > MAX) return false;
    return true;
  }),
];