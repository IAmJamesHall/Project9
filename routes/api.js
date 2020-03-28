const express = require('express');
const router = express.Router();
const models = require('../models');
// const { Courses, Users } = require('../models');
const { course } = require('../models');
const db = require('../models/index');
const {asyncHandler} = require('../util');


//TODO
router.get('/users', (req, res) => {
  res.json({currentUser: "Currently Logged-In User"})
});

// Temp function for inspecting models
// router.get('/models', (req, res) => {
//   var util = require('util')
//   const json = util.inspect(models);
//   res.json(json);
// });


/**********
 COURSES
 **********/
router.get('/courses', asyncHandler(async (req, res) => {
  const courses = await course.findAll();
  console.log(courses);
  res.status(500).end();
}))

module.exports = router;