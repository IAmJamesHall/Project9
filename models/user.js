const Sequelize = require('sequelize');

module.exports = sequelize => {
  class User extends Sequelize.Model {};
  User.init({
    // TODO: fill out nullables
    userId: Sequelize.INTEGER,
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    estimatedTime: Sequelize.STRING,
    materialsNeeded: Sequelize.STRING
  })
}