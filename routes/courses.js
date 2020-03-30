const router = require('express').Router();
const { User, Course } = require('../models').sequelize.models;

const { 
  asyncHandler, 
  validateInput,
  authenticateUser } = require('../util');



/**********
 COURSES
***********/

const filterCourse = (course) => {
  delete course.createdAt;
  delete course.updatedAt;
  delete course.User.password;
  delete course.User.createdAt;
  delete course.User.updatedAt;
  console.log(course);
  return course;
}

// GET list of all courses (with owning user)
router.get('/', asyncHandler(async (req, res) => {
  console.log(res.locals.user)
  const courses = await Course.findAll({
    include: {
      model: User
    }
  })
  const filteredCourses = courses.map(course => filterCourse(course.toJSON()))
  res.json(filteredCourses);
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
    const filteredCourse = filterCourse(course.toJSON());
    res.json(filteredCourse);
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
      //TODO: is this weird expression really necessary?
      await (await course).save();
    } else {
      res.status(403).end();
    }
  }
  res.status(204).end();
}));

// DELETE course
router.delete('/:id', authenticateUser(), asyncHandler( async (req, res) => {
  const { userId } = res.locals.user;
  const course = await Course.findOne({
    where: {
      id: req.params.id
    }
  });
  if (course) {
    if (course.userId === userId) {
      (await course).destroy();
      res.json({message: `Course with id of '${req.params.id}' deleted successfully`})
    } else {
      res.status(403).end();
    }
  } else {
    res.status(404).json({message: "Course to delete not found"});
  }
}));

module.exports = router;