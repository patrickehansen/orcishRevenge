import store from '../store';

export const setToken = (id_token) => {
  store.dispatch({
    type: 'SET_TOKEN',
    id_token : id_token,
  })
}

export const addChatMessage = (message) => {
  store.dispatch({
    type: 'ADD_CHAT_MESSAGE',
    message: message,
  })
}

export const setChatMessages = (messages) => {
  store.dispatch({
    type: 'SET_CHAT_MESSAGES',
    messages
  })  
}

export const setAvailableCharacters = (characters) => {
  store.dispatch({
    type: 'SET_AVAILABLE_CHARACTERS',
    characters
  })
}

export const setAccountDetails = (details) => {
  store.dispatch({
    type: 'SET_ACCOUNT_DETAILS',
    details
  })
}

export const setCharacterInfo = (info) => {
  store.dispatch({
    type: 'SET_CHARACTER_INFO',
    info
  })
}

export const setCharacters = (characters) => {
  store.dispatch({
    type: 'SET_CHARACTERS',
    characters
  })
}

export const setPlayers = (players) => {
  store.dispatch({
    type: 'SET_PLAYERS',
    players
  })
}

export const setGM = (isGM) => {
  store.dispatch({
    type: 'SET_GM',
    isGM
  })
}

export const setSpectator = (isSpectator) => {
  store.dispatch({
    type: 'SET_SPECTATOR',
    isSpectator,
  })
}