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

exports.asyncHandler = asyncHandler;