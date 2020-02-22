const Sequelize = require('sequelize');
const db = require('../config/database');

const greenmember = db.define('greenmember', {
  Level: {
    type:Sequelize.STRING
  }, 
  City: {
    type:Sequelize.STRING
  }, 
  Type: {
    type:Sequelize.STRING
  }, 
  State : {
    type:Sequelize.STRING
  },  
  ZIP : {
    type:Sequelize.INTEGER
  }, 
  Facility: {
    type:Sequelize.STRING
  }, 
  Phone : {
    type:Sequelize.STRING
  },  
  Website : {
    type:Sequelize.STRING
  },  
  Address : {
    type:Sequelize.STRING
  },  
  Email: {
    type:Sequelize.STRING
  }
  // Latitude: {
  //   type:Sequelize.INTEGER
  // },  
  // Longitude: {
  //   type:Sequelize.INTEGER
  // }
})

module.exports = greenmember;