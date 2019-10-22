const moment = require('moment');
const mongoose = require('mongoose');
const database = require('../database');


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

  let mainNotepad = await this.CreateNotepad();

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
    Notepads: [mainNotepad._notepadid],

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