require('dotenv').config()
const express = require('express')
require('dotenv').config()
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    storage: 'localhost',
  }
)
module.exports = sequelize
