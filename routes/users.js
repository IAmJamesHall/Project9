const router = require('express').Router();
const bcrypt = require('bcryptjs');


const { 
  asyncHandler, 
  validateInput, 
  authenticateUser } = require('../util');

const { User } = require('../models').sequelize.models;


// GET the currently authenticated user
router.get('/', authenticateUser(), asyncHandler( async(req, res) => {
  console.log(res.locals.user);
  res.json({user: res.locals.user});
}))

// POST a new user
router.post('/', asyncHandler( async(req, res) => {
  const validationErrors = validateInput(
    ['firstName', 'lastName', 'emailAddress', 'password'], 
    req.body
  );
 
  if (validationErrors.length === 0) {
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    await User.create(req.body);
    res.status(201).end()
  } else {
    res.status(400).json({message: "Bad request", errors: validationErrors });
  }
}))

module.exports = router;