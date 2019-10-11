import config from '../../../config';

const defaultAuthenticationState = {
  characters: [],
  possessedCharacter: null,
}

export default (state = defaultAuthenticationState, action) => {
    switch (action.type) {
      case 'SET_CHARACTERS' : 
        return Object.assign({}, state, {
          characters: action.characters,
        })
      case 'SET_PLAYERS' : 
        return Object.assign({}, state, {
          players: action.players,
        })
      case 'SET_CHARACTER_INFO' :
        return Object.assign({}, state, {
          possessedCharacter: action.info,
        })
      default:
    return state;
  }
}
