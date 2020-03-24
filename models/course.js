const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {};
  Course.init({
    // TODO: fill out nullables
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    emailAddress: Sequelize.STRING,
    password: Sequelize.STRING
  }, { sequelize })

  return Course;
}