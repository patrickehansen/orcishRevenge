'use strict';

import axios from 'axios';
import config from '../../config';

const api = config.server + '/api/account/login';

export default async function login (username, password) {
  let response = await axios.post(
    api,
    {
      username,
      password,
    }
  ).catch((error) => {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }else{
      throw new Error('Could not connect to server.');
    }
  })

  return response.data;
}