import config from '../../../config';

const defaultAuthenticationState = {
  id_token: localStorage.getItem(config.localstorageKey),
  chatMessages: [],
}
  
console.log(localStorage.getItem(config.localstorageKey))
const authenticationReducer = (state = defaultAuthenticationState, action) => {
  console.log(action);
    switch (action.type) {
      case 'SET_TOKEN' :
        return Object.assign({}, state, {
          id_token: action.id_token,
        })
      case 'ADD_CHAT_MESSAGE' : 
        console.log('hey here', action)
        return Object.assign({}, state, {
          chatMessages: [...state.chatMessages, action.message]
        })
      default:
    return state;
  }
}
  
export default authenticationReducer;