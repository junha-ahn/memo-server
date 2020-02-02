const validator = require('express-validator')
const presets = require('./presets')
const customs = require('./customs')
const {
  sendResponse,
  fail,
} = require('../response')

const resolveValidation = req => {
  const errors = validator.validationResult(req);
  return (errors.isEmpty()) ? null : fail.error.invalid(errors.array());
};

const resolveValidationAndResonse = customResponse => async (req, res, next) => {
  const result = resolveValidation(req)
  if (!result) return next()
  if (customResponse) await customResponse(req)
  return sendResponse(res)(result)
}

const mw = (validators) => {
  return [
    ...validators,
    resolveValidationAndResonse(),
  ];
};

module.exports = {
  ...validator,
  resolveValidation,
  resolveValidationAndResonse,
  presets,
  customs,
  mw,
}