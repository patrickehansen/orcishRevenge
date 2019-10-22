const database = require('../database');
const character = require('./character');

module.exports.CreateNotepad = async function CreateNotepad(text) {
  const Text = text || {};
  const created = await database.Notepads.create({Text})

  return created;
}

module.exports.GetNotepad = async function GetNotepad(id) {
  const found = await database.Notepads.find({
    '_notepadid' : id
  }).catch(error => {
    console.error('Error in notepads.find', error);
    throw error;
  })

  return found;
}

module.exports.SaveNotepad = async function SaveNotepad(id, text) {
  const found = await this.GetNotepad(id);

  if (found.Text !== text) {
    found.Text = text;
  }

  await found.save();
}

