const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model { };
  Course.init({
    userId: {
      type: Sequelize.INTEGER,
      validate: {
        notEmpty: {
          msg: '"userId" is required'
        }
      }
    },
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: '"title" is required'
        }
      }
    },
    description: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: '"description" is required'
        }
      }
    },
    estimatedTime: Sequelize.STRING,
    materialsNeeded: Sequelize.STRING

  }, { sequelize });

  Course.belongsTo(User);

  return Course;
}