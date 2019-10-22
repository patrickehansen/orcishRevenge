const mongoose = require('mongoose');

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
  Dislikes: [{
    type: Map,
    of: String,
  }],
  Likes: [{
    type: Map,
    of: String,
  }],
  Vices: [{
    type: Map,
    of: String,
  }],

  // Status points
  Health: {
    type: Map,
    of: Number
  },
  MagicPoints: {
    type: Map,
    of: Number,
  },
  ActionPoints: {
    type: Map,
    of: Number,
  },

  Notepads: [Number],

  // Attributes
  Endurance: Number,
  Strength: Number,
  Agility: Number,
  Reasoning: Number,
  Speed: Number,
  MagicalAffinity: Number, // Static at 8
  Alertness: Number,

  // Static starts at twelve
  Melee: Number,
  Accuracy: Number,

}, {_characterid: false})

// max HP = Endurance * 3
// max AP = Speed * 3
// Max MP = Magical Affinity * 3

// Any attribute:
// Rank 3: 2 - 18
// Rank 2: 19 - 25
// Rank 1: 26 - 30

module.exports = characterSchema;