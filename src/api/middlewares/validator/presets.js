const validator = require("express-validator");

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

exports.page_num = validator.query("page_num").isInt();
exports.page_length = validator.query("page_length").isInt();

exports.getterValidations = [
  validator
  .param("id")
  .optional({
    nullable: true
  })
  .isInt(),
  validator.query("page_num").isInt(),
  validator.query("page_length").isInt()
];