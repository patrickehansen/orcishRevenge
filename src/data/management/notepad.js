const database = require('../database');
const character = require('./character');

module.exports.CreateNotepad = async function CreateNotepad(title, text) {
  const Text = text || {};
  const Title = title || 'Notes';
  const created = await database.Notepads.create({Title, Text})

  return created;
}

module.exports.GetNotepad = async function GetNotepad(id) {
  const found = await database.Notepads.findOne({
    '_notepadid' : id
  }).catch(error => {
    console.error('Error in notepads.find', error);
    throw error;
  })

  return found;
}

module.exports.SaveNotepad = async function SaveNotepad(id, text, title) {
  const found = await this.GetNotepad(id);

  if (text && found.Text !== text) {
    found.Text = text;
  }

  if (title && found.Title !== title) {
    found.Title = title;
  }

  await found.save();
}

