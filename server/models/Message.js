const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
  text: String,
  author: String,
  date: String,
});

module.exports = model('Message', messageSchema);
