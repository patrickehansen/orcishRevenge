const mongoose = require('mongoose');
const config = require('../../config');

mongoose.connect(config.mongoUrl, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', (error) => {
  console.log('Mongoose error', error);
})

db.once('open', () => {
  console.log('Mongo connection opened!');
})