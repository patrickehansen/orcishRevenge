'use strict';
const jwt = require('jsonwebtoken');
const config = require('../../config');
const dataManager = require('../data/dataManager');

module.exports.validateToken = async function validateToken(decoded) {
  console.log('validating token')
  //Get the customer from the database
  let user = await dataManager.FindAccount(decoded.username).catch((error) => {
    console.log('Error getting user in validateToken', error);
    return {isValid: false};
  });

  //Check to see if we have matching customer data
  if (user.id === decoded.id) {
    return {isValid: true};
  }else{
    return {isValid: false};
  }
}

module.exports.createToken = function createToken(user) {
  //Return a jwt signed token
  return jwt.sign(
    {
      id: user.id, 
      username: user.Username,
    }, 
    config.secret, 
    {
      algorithm : 'HS256', 
      expiresIn: config.tokenExpiration
    }
  )
}