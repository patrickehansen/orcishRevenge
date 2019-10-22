const database = require('../database');

module.exports.AddChatHistory = async function AddChatHistory(chat) {
  if (chat.Type === 'chat') {
    await database.ChatHistory.create(chat);
  } else if (chat.Type === 'roll') {
    const roll = {
      Sent: chat.Sent,
      Sender: chat.Sender,
      Dice: chat.Roll.dice,
      Size: chat.Roll.size,
      Count: chat.Roll.count,
      Operator: chat.Roll.operator,
      Post: chat.Roll.post,
      Raw: chat.Roll.raw,
      Total: chat.Roll.total,
    }
    
    await database.RollHistory.create(roll);
  }
}

module.exports.GetChatHistory = async function GetChatHistory() {
  const chats = await database.ChatHistory.find({}).catch(error => {
    console.error('Error in chatHistory.find', error);
    throw error;
  })

  const rolls = await database.RollHistory.find({}).catch(error => {
    console.error('Error in rollHistory.find', error);
    throw error;
  })

  return chats.concat(rolls).map(v => v.toMessage());
}
