const bcrypt = require('bcryptjs');
const moment = require('moment');
const mongoose = require('mongoose');
const database = require('./database');

module.exports.VerifyUser = async function VerifyUser(username, password) {
  if (!username || !password) {
    throw new Error('Must provide both a username and a password.');
  }

  let found = await database.Account.findOne({
    Username: username
  }).catch(error => {
    console.error('Error finding a user', error);
    throw error;
  })

  if (!found) {
    return false;
  }

  let isValid = await found.compare(username, password).catch(error => {
    console.error('Error in compare', error);
  });

  if (isValid) {
    return found
  }

  return isValid;
}

module.exports.CreateAccount = async function CreateAccount(username, password, email) {
  let found = await database.Account.findOne({$or: [
    {Username: username},
    {EmailAddress: email},
  ]}).catch(error => {
    console.error('Error finding an account', error);
    throw error;
  })

  if (found) {
    throw new Error('Duplicate username');
  }

  let hash = await bcrypt.hash(password, 10);

  let account = await database.Account.create({
    Username: username,
    Hash: hash,
    EmailAddress: email,
    Created: Date.now(),
  }).catch(error => {
    console.error('Error creating an account', error);
    throw error;
  })

  return !!account;
}

module.exports.DeleteAccount = async function DeleteAccount(username) {
  let deleted = await database.Account.deleteOne({
    Username: username
  })
}

module.exports.FindAccount = async function FindAccount(username) {
  return database.Account.findOne({
    Username: username
  })
}

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

module.exports.GetAvailableCharacters = async function GetAvailableCharacters(user) {
  const allowed = await database.AccountCharacter.find({
    AccountID: user.id,
  }).catch(error => {
    console.error('Error in account character.find', error);
    throw error;
  })

  const characterIDs = allowed.map(v => mongoose.Types.ObjectId(v.CharacterID));

  const characters = await database.Character.find({
    '_id' : { '$in' : characterIDs}
  }).catch(error => {
    console.error('Error in characters.find', error);
    throw error;
  })

  return characters.map(v => {
    return {
      ...v['_doc'],
      id: v.id,
    }
  });
}

module.exports.CreateCharacter = async function CreateCharacter(character, userid) {
  const {likes, dislikes,vices} = character.Likes.reduce((a,v) => {
    switch(v.Label) {
      case 'Like': {
        a.likes.push(v)
        break;
      }
      case 'Dislike' : {
        a.dislikes.push(v);
        break;
      }
      case 'Vice' : {
        a.vices.push(v);
        break;
      }
      default : {

      }
    }

    return a;
  }, {likes: [], dislikes: [],vices: []})

  const toCreate = {
    Created: moment(),
    Name: character.Name,
    Creator: userid,
    Avatar: character.AvatarURL,
    Height: character.Height,
    Weight: character.Weight,
    EyeColor: character.EyeColor,
    HairColor: character.HairColor,
    SkinColor: character.SkinColor,
    Build: character.Build,
    Age: character.Age,
    GeneralNotes: character.GeneralNotes,

    Dislikes: dislikes,
    Likes: likes,
    Vices: vices,
    Health: {
      Total: character.Endurance * 3,
      Current: character.Endurance * 3,
    },
    MagicPoints: {
      Total: character.MagicAffinity * 3,
      Current: character.MagicAffinity * 3,
    },
    ActionPoints: {
      Total: character.Speed * 3,
      Current: character.Speed * 3,
    },

    Endurance: character.Endurance,
    Strength: character.Strength,
    Agility: character.Agility,
    Skill: character.Skill,
    Speed: character.Speed,
    MagicalAffinity: character.MagicAffinity,
    Alertness: character.Alertness,

    Melee: 12,
    Accuracy: 12,
  }

  const created = await database.Character.create(toCreate).catch(error => {
    console.error('Error creating character in database', error);
    throw error;
  })

  const join = await database.AccountCharacter.create({
    AccountID: userid,
    CharacterID: created.id
  }).catch(error => {
    console.error('Error creating account character in database', error);
    throw error;
  })
    
  return created && join;
}