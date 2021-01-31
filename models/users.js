const sq = require('../db/db')
const { DataTypes } = require('sequelize');

const User = sq.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telegramId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true
  },
}, {

});
User.sync({ alter: true });

module.exports = User;
