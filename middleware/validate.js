const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(`Validation: ${JSON.stringify(errors.array())}`);
  }

  next();
};

module.exports = {validate}