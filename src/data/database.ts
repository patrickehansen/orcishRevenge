import mongoose from 'mongoose';

import config from '../config';

import { Accounts } from './models/account';
import { ChatHistory } from './models/chatHistory';
import { RollHistory } from './models/rollHistory';
import { Characters } from './models/character';
import { Notepads } from './models/notepad';
  
mongoose.connect(config.mongoUrl, {useNewUrlParser: true});

const db = mongoose.connection;

const exporting: any = {
  Ready: false,
  Connection: db,
};

db.on('error', (error) => {
  console.error('Mongoose error', error);
})

db.once('open', () => {
  console.log('Mongo connection opened!');

  exporting.Account = Accounts;
  exporting.Character = Characters;
  exporting.ChatHistory = ChatHistory;
  exporting.RollHistory =  RollHistory;
  exporting.Notepads = Notepads;

  exporting.Ready = true;
})

export default exporting;