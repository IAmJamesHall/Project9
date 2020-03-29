'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: 'fsjstd-restapi.db'
});


// test database connection
(async function() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}());

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Course = sequelize.define('Course', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estimatedTime: DataTypes.STRING,
  materialsNeeded: DataTypes.STRING
});

User.hasMany(Course);
Course.belongsTo(User);



const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;