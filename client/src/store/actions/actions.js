export const setToken = (id_token) => ({
  type: 'SET_TOKEN',
  id_token : id_token,
})

export const addChatMessage = (message) => ({
  type: 'ADD_CHAT_MESSAGE',
  message: message,
})