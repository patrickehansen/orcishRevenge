import database from '../database';

export async function CreateNotepad(title, text) {
  const Text = text || {};
  const Title = title || 'Notes';
  const created = await database.Notepads.create({Title, Text})

  return created;
}

export async function GetNotepad(id) {
  const found = await database.Notepads.findOne({
    '_notepadid' : id
  }).catch(error => {
    console.error('Error in notepads.find', error);
    throw error;
  })

  return found;
}

export async function SaveNotepad(notepad) {
  const found = await this.GetNotepad(notepad._notepadid);

  if (found.Text !== notepad.Text) {
    found.Text = notepad.Text;
  }

  if (found.Title !== notepad.Title) {
    found.Title = notepad.Title;
  }

  await found.save();

  return found;
}