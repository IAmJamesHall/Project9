const router = require('express').Router();
const { User, Course } = require('../models').sequelize.models;
const { 
  asyncHandler, 
  validateInput,
  authenticateUser } = require('../util');



/**********
 COURSES
***********/

// GET list of all courses (with owning user)
router.get('/', asyncHandler(async (req, res) => {
  console.log(res.locals.user)
  const courses = await Course.findAll({
    include: {
      model: User
    }
  })
  res.json(courses);
}))

// GET course for provided course ID (with owning user)
router.get('/:id', asyncHandler(async (req, res) => {
  const course = await Course.findOne({
    where: {
      id: req.params.id
    }, 
    include: {
      model: User
    }
  });
  if (course) {
    res.json(course)
  } else {
    res.status(404).json({message: `No course found for id: ${req.params.id}`});
  }
}))

// POST new course
router.post('/', authenticateUser(), asyncHandler(async (req, res) => {
  const validationErrors = validateInput(['title', 'description'], req.body);

  if (validationErrors.length === 0) {
    const courseJSON = req.body;
    courseJSON.userId = res.locals.user.userId || 0;
    const course = await Course.create(courseJSON);
    res.json(course);
  } else {
    res.status(400).json({message: "Bad request", errors: validationErrors });
  }
}))

// PUT update for course
router.put('/:id', authenticateUser(), asyncHandler( async (req, res) => {
  const { userId } = res.locals.user
  const course = await Course.findOne({
    where: {
      id: req.params.id
    }
  });
  // if course was found
  if (course) {
    // check that the user has permission to edit this course
    if (course.userId === userId) {
      keys = Object.keys(req.body);
      for (let i = 0; i < keys.length; i++) {
        course[keys[i]] = req.body[keys[i]];
      }
      await (await course).save();
    } else {
      res.status(401).end();
    }
  }
  
  res.status(204).end();
}));

// DELETE course
router.delete('/:id', authenticateUser(), asyncHandler( async (req, res) => {
  const course = await Course.findOne({
    where: {
      id: req.params.id
    }
  });
  if (course) {
    (await course).destroy();
    res.json({message: `Course with id of '${req.params.id}' deleted successfully`})
  } else {
    res.status(404).json({message: "Course to delete not found"});
  }
}));

module.exports = router;