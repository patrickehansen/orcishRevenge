import config from '../../../config';

const defaultAuthenticationState = {
    id_token: localStorage.getItem(config.localstorageKey),
}
  
console.log(localStorage.getItem('id_token'))
const authenticationReducer = (state = defaultAuthenticationState, action) => {
    console.log(action);
    switch (action.type) {
    case 'SET_TOKEN' :
        return Object.assign({}, state, {
            id_token: action.id_token,
        })
    default:
    return state;
    }
}
  
export default authenticationReducer;