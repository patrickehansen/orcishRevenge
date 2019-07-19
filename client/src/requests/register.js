'use strict';

import axios from 'axios';
import config from '../../config';

const api = config.server + '/api/account/register';

export default async function register (username, email, password) {
  let response = await axios.post(
    api,
    {
      username,
      email,
      password,
    }
  ).catch((error) => {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }else{
      throw new Error('Could not connect to server.');
    }
  })

  console.log('register reponse', response);
  return response.data;
}