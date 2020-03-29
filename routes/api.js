const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(418).json({message: "You've successfully found the API, and I'm not a teapot!"});
})

router.use('/courses', require('./courses'));
router.use('/users', require('./users'));

module.exports = router;