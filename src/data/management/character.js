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

  let mainNotepad = await this.CreateNotepad('General Notes', {});

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

module.exports.GetAllCharacters = function GetAllCharacters() {
  return database.Character.find();
}

module.exports.AddNotepadToCharacter = async function AddNotepadToCharacter(characterID, notepadID) {
  const character = await database.Character.findOne({
    '_id' : characterID
  }).catch(error => {
    console.error('Error in characters.find', error);
    throw error;
  })

  if (character && !character.Notepads.includes(notepadID)) {
    try {
      character.Notepads.push(notepadID);

      await character.save();
    }catch(error) {
      console.error('hey', error);  
    }
    
    return character;
  }

  return null;
}

module.exports.AddSkill = async function AddSkill(skillData, userID) {
  const character = await database.Character.findOne({
    '_id' : skillData.character
  }).catch(error => {
    console.error('Error in characters.find', error);
    throw error;
  })

  if (!character) throw new Error('Character not found');

  let section = character.Skills.find(v => v.id === skillData.SectionID);

  if (!section) {
    throw new Error('Section does not exist');
  }

  // HMMMMMMMM
  section.Skills.push({
    Name: skillData.Name,
    Score: skillData.Score,
    MPCost: skillData.MPCost,
    APCost: skillData.APCost,
    Damage: skillData.Damage,
    Notes: skillData.Notes,
  })

  await character.save();

  return character;
}

module.exports.AddSkillSection = async function AddSkillSection(skillData, userID) {
  const character = await database.Character.findOne({
    '_id' : skillData.character
  }).catch(error => {
    console.error('Error in characters.find', error);
    throw error;
  })

  if (!character) throw new Error('Character not found')

  const existing = character.Skills.find(v => v.SectionName === skillData.SectionName);

  if (existing) {
    throw new Error('Section with that name already exists.')
  }

  character.Skills.push( {
    SectionName: skillData.SectionName,
    Placement: skillData.Placement,
    Skills: [],
  })

  await character.save();

  return character;
}

module.exports.DeleteSkill = async function DeleteSkill(data, userID) {
  const character = await database.Character.findOne({
    '_id' : data.character
  }).catch(error => {
    console.error('Error in characters.find', error);
    throw error;
  })

  if (!character) throw new Error('Character not found')

  const section = character.Skills.find(v => v['id'] === data.SectionID);

  section.Skills = section.Skills.filter(v => v.id !== data['_id']);

  await character.save();

  return character;
}

module.exports.DeleteSkillSection = async function DeleteSkillSection(data, userID) {
  const character = await database.Character.findOne({
    '_id' : data.character
  }).catch(error => {
    console.error('Error in characters.find', error);
    throw error;
  })

  if (!character) throw new Error('Character not found')

  character.Skills = character.Skills.filter(v => v.SectionName !== data.SectionName);

  await character.save();

  return character;
}


module.exports.EditSkill = async function EditSkill(data, userID) {
  const character = await database.Character.findOne({
    '_id' : data.character
  }).catch(error => {
    console.error('Error in characters.find', error);
    throw error;
  })

  if (!character) throw new Error('Character not found')

  const section = character.Skills.find(v => v['id'] === data.Skill.SectionID);
  const extant = section.Skills.find(v => v['id'] === data.Skill['_id']);

  console.log(extant, data.Skill)

  const { Skill } = data;

  Object.entries(Skill).forEach(([key,value]) => {
    if (key == '_id' || key == 'SectionID') return;
    if (extant[key] != value) extant[key] = value;
  })

  await character.save();

  return character;
}

module.exports.EditSkillSection = async function EditSkillSection(data, userID) {
  const character = await database.Character.findOne({
    '_id' : data.character
  }).catch(error => {
    console.error('Error in characters.find', error);
    throw error;
  })

  if (!character) throw new Error('Character not found');

  const section = character.Skills.find(v => v['id'] === data['_id']);

  section.SectionName = data.SectionName;
  section.Placement = data.Placement;

  if (section.Skills.length > data.Skills.length) {
    const newIds = data.Skills.map(v => v._id);
    const index = section.Skills.findIndex(v => !newIds.includes(v.id));

    section.Skills.splice(index, 1);
  }else if (section.Skills.length < data.Skills.length) {
    const newIndex = data.Skills.findIndex(v => !v._id);

    section.Skills.splice(newIndex, 0, data.Skills[newIndex]);
  } else{
    // Reorder
    section.Skills = data.Skills;
  }

  await character.save();

  return character;
}