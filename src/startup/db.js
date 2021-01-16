const mongoose = require('mongoose');
const logger = require('./logging');
// const config = require('config');

// Main Export
module.exports = function () {
    // Connect DB
    // const db = config.get('db');
    // mongoose.connect(db, {
    mongoose.connect('mongodb://localhost:27017/harel-web', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => logger.info('Connected to MongoDB...'))
  .catch(err => console.log('Could not connected to MongoDB...', err));

}