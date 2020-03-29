function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}

/**
 * 
 * @param {list} requiredValues 
 * @param {object} input req.body, as received from the (post/put) request
 * @return {list} all validation errors, if any
 */
function validateInput(requiredValues, input) {
  const errors = [];
  requiredValues.forEach((element, i) => {
    console.log('validate input ', input[requiredValues[i]]);
    if (!input[requiredValues[i]]) {
      errors.push(`Error with '${requiredValues[i]}' validation.`);
    }
  })
  return errors;
}

exports.asyncHandler = asyncHandler;
exports.validateInput = validateInput;