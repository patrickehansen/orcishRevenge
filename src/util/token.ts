import jwt from 'jsonwebtoken';
import config from '../config';
import * as dataManager from '../data/dataManager';

export async function validateToken(decoded, request) {
  //Get the user account from the database
  let user = await dataManager.findAccount(decoded.username).catch((error) => {
    console.log('Error getting user in validateToken', error);
    return {isValid: false};
  });

  //Check to see if we have matching user record and assign the pre data.
  if (user.id === decoded.id) {
    request.pre.user = user;

    return {isValid: true};
  }else{
    return {isValid: false};
  }
}

export function createToken(user) {
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