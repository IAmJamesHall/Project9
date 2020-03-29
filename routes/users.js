const router = require('express').Router();
const { asyncHandler, validateInput } = require('../util');

const { User } = require('../models').sequelize.models;


// GET the currently authenticated user

// POST a new user
router.post('/', asyncHandler( async(req, res) => {
  const validationErrors = validateInput(
    ['firstName', 'lastName', 'emailAddress', 'password'], 
    req.body
  );

  if (validationErrors.length === 0) {
    const user = await User.create(req.body);
    res.status(201).end()
  } else {
    res.status(400).json({message: "Bad request", errors: validationErrors });
  }
}))

module.exports = router;