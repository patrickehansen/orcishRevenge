'use strict';

import axios from 'axios';
import config from '../../../config';
import store from '../../store/store';
import {setCharacterInfo, setSpectator, setGM} from '../../store/actions/actions'

const api = config.server + '/api/character/possess';

export default async function possessCharacter (characterID) {
  let response = await axios.post(
    api,
    {
      CharacterID: characterID
    }, 
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

  if (response.data === 'spectator') {
    setSpectator(true);
  }else if (response.data === 'gm') {
    setGM(true);
  }
  
  setCharacterInfo(response.data);

  return;
}