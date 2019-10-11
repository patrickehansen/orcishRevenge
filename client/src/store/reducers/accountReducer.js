import config from '../../../config';

const defaultAuthenticationState = {
  id_token: localStorage.getItem(config.localstorageKey),
  availableCharacters: [],
  possessedCharacter: null,
}
  
//console.log(localStorage.getItem(config.localstorageKey))
const authenticationReducer = (state = defaultAuthenticationState, action) => {
    switch (action.type) {
      case 'SET_TOKEN' :
        return Object.assign({}, state, {
          id_token: action.id_token,
        })
      case 'SET_ACCOUNT_DETAILS' : {
        return Object.assign({}, state, {
          ...action.details,
        })
      }
      case 'SET_AVAILABLE_CHARACTERS' :{
        return Object.assign({}, state, {
          availableCharacters: action.characters,
        })
      }
      case 'SET_SPECTATOR': {
        return Object.assign({}, state, {
          isSpectator: action.isSpectator,
        })
      }
      case 'SET_GM': {
        return Object.assign({}, state, {
          isGM: action.isGM,
        })
      }
      default:
    return state;
  }
}
  
export default authenticationReducer;