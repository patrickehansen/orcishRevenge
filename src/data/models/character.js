const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const skill = new mongoose.Schema({
  Name: String,
  Score: Number,
  MPCost: Number,
  APCost: Number,
  Damage: String,
  Notes: String,
}, {_skillid: false}).plugin(autoIncrement, {inc_field: '_skillid'});

const skillSection = new mongoose.Schema({
  SectionName: String,
  Placement: String,
  Skills: [ skill ],
}, {_sectionid: false}).plugin(autoIncrement, {inc_field: '_sectionid'});

const item = new mongoose.Schema({
  Quantity: Number,
  Name: String,
  Effect: String,
  Armor: String,
  Damage: String,
  Notes: String,
}, {_itemid: false}).plugin(autoIncrement, {inc_field: '_itemid'});

const itemSection = new mongoose.Schema({
  SectionName: String,
  Placement: String,
  Items: [ item ],
}, {_itemsectionid: false}).plugin(autoIncrement, {inc_field: '_itemsectionid'});

const like = new mongoose.Schema({
  Title: String,
  Description: String,
})

const points = new mongoose.Schema({
  Current: Number,
  Total: Number,
})

const characterSchema = new mongoose.Schema({
  _characterid: Number,
  // Basic 
  Created: {type: Date, default: Date.now},
  Name: String,
  Creator: String,
  Avatar: String,

  // RP Physical descriptors
  Height: String,
  Weight: String,
  EyeColor: String,
  HairColor: String,
  SkinColor: String,
  Build: String,
  Age: Number,
  GeneralNotes: String,

  // RP Personality descriptors
  Dislikes: [like],
  Likes: [like],
  Vices: [like],

  // Status points
  HitPoints: points,
  MagicPoints: points,
  ActionPoints: points,

  Notepads: [Number],

  // Attributes
  Endurance: Number,
  Strength: Number,
  Agility: Number,
  Reasoning: Number,
  Speed: Number,
  MagicalAffinity: Number, 
  Alertness: Number,

  // Static starts at twelve
  Melee: Number,
  Accuracy: Number,

  // Skills array
  Skills: [ skillSection ],
  Items: [ itemSection ],
}, {_characterid: false}).plugin(autoIncrement, {inc_field: '_characterid'});


// max HP = Endurance * 3
// max AP = Speed * 3
// Max MP = Magical Affinity * 3

// Any attribute:
// Rank 3: 2 - 18
// Rank 2: 19 - 25
// Rank 1: 26 - 30

module.exports = characterSchema;