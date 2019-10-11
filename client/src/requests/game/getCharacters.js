'use strict';

import axios from 'axios';
import config from '../../../config';
import store from '../../store/store';
import {setCharacters} from '../../store/actions/actions'

const api = config.server + '/api/game/characters';

export default async function getCharacters () {
  let response = await axios.get(
    api,
    {
      headers: {'Authorization': store.getState().account.id_token}
    }
  ).catch((error) => {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }else{
      throw new Error('Could not connect to server.');
    }
  })

  setCharacters(response.data);

  return;
}